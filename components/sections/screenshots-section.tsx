"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

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
    <section className="py-12 md:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Beautiful, intuitive design
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the app that makes learning English a joy
          </p>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-all hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-all hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </motion.div>

      </div>

      {/* Screenshots carousel - Full width scroll */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        ref={scrollRef}
        className="flex gap-6 md:gap-10 overflow-x-auto py-12 md:py-16 snap-x snap-mandatory scrollbar-hide px-4 sm:px-12 md:px-24 min-h-[550px] lg:min-h-[650px] w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {screenshots.map((screenshot, index) => (
          <motion.div 
            key={index} 
            whileHover={{ y: -10 }}
            className="flex-shrink-0 snap-center flex flex-col items-center justify-center"
          >
            <img 
              src={screenshot.src} 
              alt={screenshot.alt}
              className="w-[280px] sm:w-[300px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500 hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            />
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              className="mt-6 text-sm font-semibold text-muted-foreground/80 tracking-wide uppercase"
            >
              {screenshot.label}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
