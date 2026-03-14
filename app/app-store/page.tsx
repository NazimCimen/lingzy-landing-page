"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Apple, ArrowLeft } from "lucide-react"

export default function AppStoreComingSoon() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full text-center"
      >
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.div 
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 shadow-inner"
        >
          <Apple className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">
          Coming Soon
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed text-pretty">
          Our iOS app is currently in the final stages of review. We're working hard to bring the full Lingzy experience to your iPhone.
        </p>
      </motion.div>
    </div>
  )
}
