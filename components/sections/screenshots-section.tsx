"use client"

import { useRef } from "react"
import { IPhoneMockup } from "@/components/iphone-mockup"
import { ChevronLeft, ChevronRight } from "lucide-react"

const screenshots = [
  {
    src: "/images/screenshots/books.png",
    alt: "Classic Books Library",
    label: "Books"
  },
  {
    src: "/images/screenshots/quick-reads.png",
    alt: "Quick Reads Articles",
    label: "Quick Reads"
  },
  {
    src: "/images/screenshots/word-workshop.png",
    alt: "Word Workshop Vocabulary",
    label: "Word Workshop"
  },
  {
    src: "/images/screenshots/ai-story.png",
    alt: "AI Story Generator",
    label: "AI Stories"
  },
  {
    src: "/images/screenshots/dictionary.png",
    alt: "Built-in Dictionary",
    label: "Dictionary"
  }
]

export function ScreenshotsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Beautiful, intuitive design
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the app that makes learning English a joy
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Screenshots carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4"
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
                className="hover:scale-105 transition-transform duration-300"
              />
              <span className="mt-4 text-sm font-medium text-muted-foreground">
                {screenshot.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
