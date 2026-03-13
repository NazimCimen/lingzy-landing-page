"use client"

import { useRef, useState } from "react"
import { IPhoneMockup } from "@/components/iphone-mockup"
import { ChevronLeft, ChevronRight } from "lucide-react"

const screenshots = [
  {
    src: "/images/screenshots/books.png",
    alt: "Classic Books Library",
    label: "Books",
    description: "500+ classic books"
  },
  {
    src: "/images/screenshots/quick-reads.png",
    alt: "Quick Reads Articles",
    label: "Quick Reads",
    description: "Short engaging articles"
  },
  {
    src: "/images/screenshots/word-workshop.png",
    alt: "Word Workshop Vocabulary",
    label: "Word Workshop",
    description: "Save & practice words"
  },
  {
    src: "/images/screenshots/ai-story.png",
    alt: "AI Story Generator",
    label: "AI Stories",
    description: "Personalized content"
  },
  {
    src: "/images/screenshots/dictionary.png",
    alt: "Built-in Dictionary",
    label: "Dictionary",
    description: "Instant definitions"
  }
]

export function ScreenshotsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      const newIndex = direction === "left" 
        ? Math.max(0, activeIndex - 1)
        : Math.min(screenshots.length - 1, activeIndex + 1)
      setActiveIndex(newIndex)
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  return (
    <section className="py-24 md:py-36 overflow-hidden bg-gradient-to-b from-transparent via-muted/30 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">App Preview</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-balance">
            Beautiful, intuitive design
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Every screen crafted to make learning English feel natural and enjoyable
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => scroll("left")}
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Screenshots carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-10 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-8 md:px-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {screenshots.map((screenshot, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 snap-center flex flex-col items-center"
            >
              <IPhoneMockup 
                src={screenshot.src} 
                alt={screenshot.alt}
              />
              <div className="mt-6 text-center">
                <p className="text-base font-semibold text-foreground mb-1">
                  {screenshot.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {screenshot.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index)
                scrollRef.current?.scrollTo({
                  left: index * 300,
                  behavior: "smooth"
                })
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? "bg-primary w-6" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to screenshot ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
