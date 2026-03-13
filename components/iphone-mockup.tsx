interface IPhoneMockupProps {
  src: string
  alt: string
  className?: string
}

export function IPhoneMockup({ src, alt, className = "" }: IPhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone Frame */}
      <div className="relative mx-auto w-[280px] h-[572px] bg-foreground rounded-[3rem] p-[10px] shadow-2xl">
        {/* Inner bezel */}
        <div className="relative w-full h-full bg-foreground rounded-[2.5rem] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-foreground rounded-full z-10" />
          
          {/* Screen */}
          <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-card">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
