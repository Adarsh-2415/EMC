import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import slider1 from '@/assets/images/slider-1.jpg'
import slider3 from '@/assets/images/slider-3.webp'
import slider4 from '@/assets/images/slider-4.jpg'
import slider5 from '@/assets/images/slider-5.jpg'
import slider6 from '@/assets/images/slider-6.jpg'
import slider7 from '@/assets/images/slider-7.jpg'
import slider8 from '@/assets/images/slider-8.jpg'
import slider10 from '@/assets/images/slider-10.jpg'

const SLIDER_IMAGES = [
  {
    src: slider10,
    alt: 'Excel Management Certifications - ISO Certification & R&D Consultancy Services',
  },
  {
    src: slider1,
    alt: 'Excel Management Certifications - Autonomous Assessment & ISO Certification Body',
  },
  {
    src: slider3,
    alt: 'ISO 9001 & ISO 14001 Quality & Environmental Management Certification Services',
  },
  {
    src: slider4,
    alt: 'Personnel Certification & ISO Lead Auditor Training Programs',
  },
  {
    src: slider5,
    alt: 'ISO 45001 Occupational Health & Safety Management System Auditing',
  },
  {
    src: slider6,
    alt: 'ISO 27001 Information Security & CE Marking Product Compliance Assessment',
  },
  {
    src: slider7,
    alt: 'Global Management System Certification & Verification Consultancy',
  },
  {
    src: slider8,
    alt: 'Online ISO Certificate Verification & Application Portal',
  },
]

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [isPaused, setIsPaused] = useState(false)

  const handleNext = useCallback(() => {
    setDirection('next')
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDER_IMAGES.length)
  }, [])

  const handlePrev = useCallback(() => {
    setDirection('prev')
    setCurrentIndex((prevIndex) => (prevIndex - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  // Curtain Reveal & Parallax variants with strict Framer Motion typing
  const curtainVariants: Variants = {
    initial: (dir: 'next' | 'prev') => ({
      clipPath:
        dir === 'next'
          ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
          : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      scale: 1.06,
    }),
    animate: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
      },
    },
    exit: (dir: 'next' | 'prev') => ({
      clipPath:
        dir === 'next'
          ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
          : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
      scale: 0.98,
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
      },
    }),
  }

  const activeImage = SLIDER_IMAGES[currentIndex]

  return (
    <div
      className="w-full relative bg-slate-950 overflow-hidden select-none group min-h-[260px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[520px] flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Split-Curtain Image Slider"
    >
      {/* Smooth Split-Curtain Parallax Transition Container */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={curtainVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full overflow-hidden z-10"
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev Navigation Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/40 hover:bg-slate-950/80 text-white backdrop-blur-xs border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Navigation Arrow */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/40 hover:bg-slate-950/80 text-white backdrop-blur-xs border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-xs border border-white/10">
        {SLIDER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setDirection(idx > currentIndex ? 'next' : 'prev')
              setCurrentIndex(idx)
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-6 bg-white'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
