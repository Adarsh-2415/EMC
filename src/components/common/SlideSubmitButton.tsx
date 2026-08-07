import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronRight, Loader2, Send } from 'lucide-react'

interface SlideSubmitButtonProps {
  buttonText: string
  isSubmitting: boolean
  onSlideComplete: () => void
  disabled?: boolean
}

export const SlideSubmitButton: React.FC<SlideSubmitButtonProps> = ({
  buttonText,
  isSubmitting,
  onSlideComplete,
  disabled = false,
}) => {
  const [dragProgress, setDragProgress] = useState(0) // 0 to 100
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleStart = () => {
    if (disabled || isSubmitting) return
    setIsDragging(true)
  }

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || disabled || isSubmitting || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const handleWidth = 52 // width of slider handle button
      const maxDrag = rect.width - handleWidth
      const currentX = Math.max(0, Math.min(clientX - rect.left - handleWidth / 2, maxDrag))
      const percentage = Math.round((currentX / maxDrag) * 100)

      setDragProgress(percentage)

      if (percentage >= 92) {
        setDragProgress(0)
        setIsDragging(false)
        onSlideComplete()
      }
    },
    [isDragging, disabled, isSubmitting, onSlideComplete]
  )

  const handleEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragProgress < 92) {
      setDragProgress(0)
    }
  }, [isDragging, dragProgress])

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
    if (disabled || isSubmitting) return
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const newProgress = Math.min(100, dragProgress + 25)
      setDragProgress(newProgress)
      if (newProgress >= 100) {
        setDragProgress(0)
        onSlideComplete()
      }
    }
  }

  return (
    <div className="w-full pt-2">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`w-full relative h-13 sm:h-14 rounded-xl overflow-hidden select-none border transition-all flex items-center bg-slate-900 border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
          disabled || isSubmitting ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
        }`}
        aria-label={`${buttonText} slider button`}
      >
        {/* Loading Spinner Overlay */}
        {isSubmitting ? (
          <div className="w-full h-full flex items-center justify-center gap-2 font-bold text-sm text-white">
            <Loader2 className="w-5 h-5 animate-spin text-white" aria-hidden="true" />
            <span>Submitting...</span>
          </div>
        ) : (
          <>
            {/* Progress Fill Track */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-emerald-600/30 transition-all duration-75"
              style={{ width: `${dragProgress}%` }}
            />

            {/* Instruction Prompt Text */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm font-bold tracking-wide pointer-events-none gap-2 px-12 text-center">
              <Send className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="truncate">Slide to {buttonText}</span>
            </div>

            {/* Draggable Handle Button */}
            <div
              onMouseDown={handleStart}
              onTouchStart={handleStart}
              style={{ left: `calc(${dragProgress}% * 0.88)` }}
              className={`absolute top-1 bottom-1 w-12 bg-white hover:bg-slate-100 text-slate-950 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg transition-transform ${
                isDragging ? 'scale-105 bg-slate-100' : ''
              }`}
            >
              <ChevronRight className="w-6 h-6 text-slate-900" aria-hidden="true" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
