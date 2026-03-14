"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <motion.span 
          whileHover={{ rotate: 15 }}
          className="text-primary"
        >
          {icon}
        </motion.span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      
      {/* Subtle border shine effect */}
      <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/10 rounded-2xl transition-colors pointer-events-none" />
    </motion.div>
  )
}
