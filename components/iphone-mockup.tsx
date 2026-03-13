interface IPhoneMockupProps {
  src: string
  alt: string
  className?: string
  size?: "default" | "large"
}

export function IPhoneMockup({ src, alt, className = "", size = "default" }: IPhoneMockupProps) {
  const dimensions = size === "large" 
    ? { width: "w-[300px]", height: "h-[612px]", padding: "p-[12px]", radius: "rounded-[3.2rem]", innerRadius: "rounded-[2.7rem]", screenRadius: "rounded-[2.5rem]" }
    : { width: "w-[260px]", height: "h-[530px]", padding: "p-[10px]", radius: "rounded-[2.8rem]", innerRadius: "rounded-[2.4rem]", screenRadius: "rounded-[2.2rem]" }

  return (
    <div className={`relative group ${className}`}>
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Reflection/shine effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-[3.5rem] opacity-50" />
      
      {/* iPhone Frame - Titanium style */}
      <div className={`relative mx-auto ${dimensions.width} ${dimensions.height} bg-gradient-to-b from-[#2a2a2c] via-[#1c1c1e] to-[#0a0a0a] ${dimensions.radius} ${dimensions.padding} shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_30px_60px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]`}>
        
        {/* Side buttons - Volume */}
        <div className="absolute -left-[2px] top-[100px] w-[3px] h-[35px] bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] rounded-l-sm" />
        <div className="absolute -left-[2px] top-[145px] w-[3px] h-[55px] bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] rounded-l-sm" />
        <div className="absolute -left-[2px] top-[210px] w-[3px] h-[55px] bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] rounded-l-sm" />
        
        {/* Side button - Power */}
        <div className="absolute -right-[2px] top-[140px] w-[3px] h-[80px] bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] rounded-r-sm" />
        
        {/* Inner bezel */}
        <div className={`relative w-full h-full bg-black ${dimensions.innerRadius} overflow-hidden`}>
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[32px] bg-black rounded-full z-20 flex items-center justify-center shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]">
            {/* Camera dot */}
            <div className="absolute right-4 w-[10px] h-[10px] rounded-full bg-[#1a1a1c] ring-1 ring-[#2a2a2c]" />
          </div>
          
          {/* Screen with subtle inner shadow */}
          <div className={`relative w-full h-full ${dimensions.screenRadius} overflow-hidden bg-white`}>
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-top"
            />
            {/* Screen glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
        
        {/* Frame highlight */}
        <div className="absolute inset-0 rounded-[3rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>
    </div>
  )
}
