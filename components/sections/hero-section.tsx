import { IPhoneMockup } from "@/components/iphone-mockup"
import { AppStoreButtons } from "@/components/app-store-buttons"
import { BookOpen } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(19,93,177,0.12),transparent)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        {/* Logo */}
        <div className="flex justify-center mb-14 md:mb-20">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Lingzy
            </span>
          </a>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Now available on iOS & Android
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight text-balance mb-6">
                Learn English by Reading Real Stories
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 text-pretty">
                Improve your English naturally through classic books, short reads, and AI-generated stories crafted for your level.
              </p>
              <AppStoreButtons className="justify-center lg:justify-start" />
              
              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-10 pt-10 border-t border-border">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">Classic Books</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">50K+</p>
                  <p className="text-sm text-muted-foreground">Active Learners</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">4.9</p>
                  <p className="text-sm text-muted-foreground">App Store</p>
                </div>
              </div>
            </div>

            {/* iPhone Mockup */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                
                <IPhoneMockup 
                  src="/images/screenshots/books.png" 
                  alt="Lingzy Books Screen"
                  size="large"
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
