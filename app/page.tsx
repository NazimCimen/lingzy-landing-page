"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { ScreenshotsSection } from "@/components/sections/screenshots-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { CTASection } from "@/components/sections/cta-section"
import { DeveloperSection } from "@/components/sections/developer-section"
import { Footer } from "@/components/sections/footer"
import { motion, useScroll, useSpring } from "framer-motion"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main className="min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-50 shadow-[0_2px_10px_rgba(var(--primary),0.3)]"
        style={{ scaleX }}
      />
      
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <HowItWorksSection />
      <DeveloperSection />
      <CTASection />
      <Footer />
    </main>
  )
}
