"use client"

import { AppStoreButtons } from "@/components/app-store-buttons"
import { motion, Variants } from "framer-motion"

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smoother feel
      },
    },
  }

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-32">
      {/* Background gradient elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" 
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-4 relative">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12 md:mb-16"
        >
          <div className="group cursor-pointer flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <motion.img 
              whileHover={{ rotate: [-2, 2, -2, 2, 0], transition: { duration: 0.5 } }}
              src="/images/lingzylogo.webp" 
              alt="Lingzy" 
              className="h-16 md:h-20 w-auto object-contain rounded-[1.25rem] shadow-lg"
            />
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight text-balance mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70"
              >
                Read World Classics Without the Struggle.
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 text-pretty"
              >
                Dive into timeless literature with smart adaptation. Scale any text to your exact level, tap for instant meanings, and learn through stories you actually love.
              </motion.p>
              <motion.div variants={itemVariants}>
                <AppStoreButtons className="justify-center lg:justify-start" />
              </motion.div>
            </motion.div>

            {/* iPhone Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="order-1 lg:order-2 flex justify-center perspective-1000"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <img 
                  src="/images/screenshots/books.png" 
                  alt="Lingzy Books Screen"
                  className="w-[280px] sm:w-[320px] lg:w-[360px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
