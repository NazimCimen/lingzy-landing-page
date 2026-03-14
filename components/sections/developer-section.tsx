"use client"

import { motion } from "framer-motion"
import { Linkedin, Heart, Code2 } from "lucide-react"

export function DeveloperSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:32px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            {/* Developer Info Card */}
            <div className="md:w-1/3 flex flex-col items-center md:items-start space-y-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl relative z-10 bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-12 h-12 text-primary/50" />
                </div>
                <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl -z-10" />
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground">Nazım Çimen</h3>
                <p className="text-muted-foreground font-medium mb-4">Creator of Lingzy</p>
                <a 
                  href="https://www.linkedin.com/in/nazim-cimen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] px-6 py-2.5 rounded-xl font-medium transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect
                </a>
              </div>
            </div>

            {/* The Story */}
            <div className="md:w-2/3 bg-background p-8 md:p-10 rounded-3xl shadow-sm border border-border/50 relative">
              <div className="absolute -top-6 -left-6 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center border-8 border-background">
                <Heart className="w-6 h-6 text-primary fill-primary/20" />
              </div>
              
              <h4 className="text-xl font-bold text-foreground mb-4 pt-2">Why I built Lingzy</h4>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  As a language learner myself, I always faced a frustrating dilemma: reading simplified English books felt uninspiring, but tackling world classics in their original form was overwhelmingly difficult.
                </p>
                <p>
                  I realized there had to be a better way to experience the authentic beauty of literature without constantly reaching for a dictionary. That's why I created Lingzy.
                </p>
                <p>
                  My goal was to build a tool that bridges the gap—allowing learners to read timeless stories in their original text while dynamically adapting the language to their exact level. I hope Lingzy makes your English learning journey as enjoyable and natural as reading your favorite book.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
