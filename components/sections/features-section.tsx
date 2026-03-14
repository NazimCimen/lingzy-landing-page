"use client"

import { FeatureCard } from "@/components/feature-card"
import { BookOpen, Newspaper, Sparkles, Puzzle, Search, FileText } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Classic Books",
    description: "Read famous classics like Dracula, Sherlock Holmes and more while improving your English."
  },
  {
    icon: <Newspaper className="w-6 h-6" />,
    title: "Quick Reads",
    description: "Short articles designed for fast learning and daily reading practice."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Story Generator",
    description: "Generate personalized stories with AI and learn vocabulary in context."
  },
  {
    icon: <Puzzle className="w-6 h-6" />,
    title: "Word Workshop",
    description: "Interactive vocabulary practice system to reinforce learning."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Built-in Dictionary",
    description: "Tap any word to instantly see its meaning without leaving the page."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Word Meaning Sheets",
    description: "Automatically generated sheets help you remember new vocabulary."
  }
]

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
            Everything you need to master English
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make learning natural and engaging
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
