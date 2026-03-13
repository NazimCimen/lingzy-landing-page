import { IPhoneMockup } from "@/components/iphone-mockup"
import { AppStoreButtons } from "@/components/app-store-buttons"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        {/* Logo */}
        <div className="flex justify-center mb-12 md:mb-16">
          <img 
            src="/images/logo.png" 
            alt="Lingzy" 
            className="h-10 md:h-12 w-auto"
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance mb-6">
                Learn English by Reading Real Stories
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
                Improve your English naturally through classic books, short reads, and AI-generated stories.
              </p>
              <AppStoreButtons className="justify-center lg:justify-start" />
            </div>

            {/* iPhone Mockup */}
            <div className="order-1 lg:order-2 flex justify-center">
              <IPhoneMockup 
                src="/images/screenshots/books.png" 
                alt="Lingzy Books Screen"
                className="transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
