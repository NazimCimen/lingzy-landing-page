"use client"

import { BookMarked, MousePointerClick, TrendingUp } from "lucide-react"
import { motion, Variants } from "framer-motion"

const steps = [
  {
    icon: <BookMarked className="w-8 h-8" />,
    number: "01",
    title: "Choose a book or article",
    description: "Browse our collection of classic books and curated articles at your level."
  },
  {
    icon: <MousePointerClick className="w-8 h-8" />,
    number: "02",
    title: "Tap words to learn meanings",
    description: "Instantly see definitions, translations, and examples for any word."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    number: "03",
    title: "Improve naturally",
    description: "Build vocabulary through context, not memorization."
  }
]

export function HowItWorksSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const stepVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            How Lingzy works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to fluent English
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={stepVariants}
              className="relative text-center group h-full"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + (index * 0.2) }}
                  className="hidden md:block absolute top-12 left-1/2 w-full h-[2px] bg-primary/20 origin-left z-0" 
                />
              )}
              
              {/* Step card */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="relative bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-xl transition-all duration-300 z-10 h-full flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/15 transition-colors">
                  <span className="text-primary">{step.icon}</span>
                </div>
                <div className="text-xs font-bold text-primary mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
