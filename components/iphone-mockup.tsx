interface IPhoneMockupProps {
  src: string
  alt: string
  className?: string
}

export function IPhoneMockup({ src, alt, className = "" }: IPhoneMockupProps) {
  return (
    <div className={`relative mx-auto w-[240px] sm:w-[280px] md:w-[320px] aspect-[1/2.16] ${className}`}>
      
      {/* Ambient Outer Shadow for Depth */}
      <div className="absolute -inset-4 bg-black/10 dark:bg-black/40 blur-2xl rounded-[4rem] -z-10 pointer-events-none" />

      {/* Hardware Buttons (Outside the main frame) */}
      <div className="absolute top-[20%] -left-[2px] w-[2px] h-[6%] bg-[#1a1a1a] dark:bg-[#333] rounded-l-sm" />
      <div className="absolute top-[30%] -left-[2px] w-[2px] h-[10%] bg-[#1a1a1a] dark:bg-[#333] rounded-l-sm" />
      <div className="absolute top-[42%] -left-[2px] w-[2px] h-[10%] bg-[#1a1a1a] dark:bg-[#333] rounded-l-sm" />
      <div className="absolute top-[32%] -right-[2px] w-[2px] h-[15%] bg-[#1a1a1a] dark:bg-[#333] rounded-r-sm" />

      {/* Main Device Frame - Uses thick border to perfectly simulate bezel */}
      <div className="relative w-full h-full bg-background rounded-[3rem] sm:rounded-[3.5rem] border-[8px] sm:border-[12px] border-[#111] dark:border-[#1a1a1a] shadow-2xl overflow-hidden ring-1 ring-border/20">
        
        {/* Dynamic Island */}
        <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-[35%] sm:w-[32%] h-[24px] sm:h-[30px] bg-[#111] dark:bg-[#1a1a1a] rounded-full z-20 flex items-center justify-between px-2 sm:px-3">
          {/* Mock Camera Sensors */}
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-indigo-950/60" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/5" />
        </div>

        {/* Screen Image Content */}
        <div className="w-full h-full relative bg-card">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top"
          />
          
          {/* Subtle Glare overlay to make screen feel like glass */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.04] pointer-events-none" />
        </div>
        
        {/* Home Indicator Bar */}
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 w-[35%] h-[4px] sm:h-[5px] bg-foreground/30 dark:bg-foreground/60 rounded-full z-20 mix-blend-difference" />
      </div>
    </div>
  )
}
