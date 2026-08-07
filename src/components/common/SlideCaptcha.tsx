import React, { useState, useRef, useEffect, useCallback } from 'react'
import { CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react'

/* eslint-disable no-unused-vars */
interface SlideCaptchaProps {
  onVerify: (verified: boolean) => void
  isVerified: boolean
  error?: string | null
}
/* eslint-enable no-unused-vars */

export const SlideCaptcha: React.FC<SlideCaptchaProps> = ({
  onVerify,
  isVerified,
  error,
}) => {
  const [dragProgress, setDragProgress] = useState(0) // 0 to 100
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleStart = () => {
    if (isVerified) return
    setIsDragging(true)
  }

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || isVerified || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const handleWidth = 48 // width of slider handle
      const maxDrag = rect.width - handleWidth
      const currentX = Math.max(0, Math.min(clientX - rect.left - handleWidth / 2, maxDrag))
      const percentage = Math.round((currentX / maxDrag) * 100)

      setDragProgress(percentage)

      if (percentage >= 92) {
        setDragProgress(100)
        setIsDragging(false)
        onVerify(true)
      }
    },
    [isDragging, isVerified, onVerify]
  )

  const handleEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragProgress < 92) {
      setDragProgress(0)
      onVerify(false)
    }
  }, [isDragging, dragProgress, onVerify])

  // Mouse Listeners
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const onMouseUp = () => handleEnd()

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDragging, handleMove, handleEnd])

  // Touch Listeners
  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX)
      }
    }
    const onTouchEnd = () => handleEnd()

    if (isDragging) {
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onTouchEnd)
    }

    return () => {
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isDragging, handleMove, handleEnd])

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isVerified) return
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault()
      const newProgress = Math.min(100, dragProgress + 25)
      setDragProgress(newProgress)
      if (newProgress >= 100) {
        onVerify(true)
      }
    }
  }

  return (
    <div className="w-full space-y-1.5">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        Security Verification <span className="text-red-500">*</span>
      </label>

      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`w-full relative h-12 rounded-xl overflow-hidden select-none border transition-all flex items-center focus-visible:outline-none focus-visible:ring-2 ${
          isVerified
            ? 'bg-emerald-500 border-emerald-600 text-white'
            : error
            ? 'bg-red-50/40 border-red-500 focus-visible:ring-red-500'
            : 'bg-slate-100 border-slate-300 focus-visible:ring-slate-900'
        }`}
        aria-label="Slide to verify slider captcha"
      >
        {/* Verified Overlay */}
        {isVerified ? (
          <div className="w-full h-full flex items-center justify-center gap-2 font-bold text-sm text-white animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 text-white" aria-hidden="true" />
            <span>Verification Complete</span>
          </div>
        ) : (
          <>
            {/* Progress Track Fill */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-slate-300/60 transition-all duration-75"
              style={{ width: `${dragProgress}%` }}
            />

            {/* Instruction Prompt */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs sm:text-sm font-semibold tracking-wide pointer-events-none gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Slide to verify</span>
            </div>

            {/* Draggable Handle Button */}
            <div
              onMouseDown={handleStart}
              onTouchStart={handleStart}
              style={{ left: `calc(${dragProgress}% * 0.88)` }}
              className={`absolute top-1 bottom-1 w-12 bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md transition-transform ${
                isDragging ? 'scale-105 bg-slate-800' : ''
              }`}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </div>
          </>
        )}
      </div>

      {error && !isVerified && (
        <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
