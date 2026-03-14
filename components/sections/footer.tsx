import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center">
              <img 
                src="/images/lingzylogo.webp" 
                alt="Lingzy" 
                className="h-8 md:h-10 w-auto object-contain rounded-xl shadow-sm"
              />
            </div>
            <span className="font-bold text-lg hidden md:inline-block">Lingzy</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/privacy-policy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-and-conditions" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <a 
              href="mailto:cimennazim.dev@gmail.com" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lingzy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
