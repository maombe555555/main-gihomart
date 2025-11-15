'use client'

import Image from 'next/image'

interface HeroImageProps {
  src: string
  alt: string
  className?: string
}

export default function HeroImage({ src, alt, className }: HeroImageProps) {
  return (
    <div className="relative w-full h-[600px]">
      <Image src={src} alt={alt} fill className={`object-cover ${className || ''}`} />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
