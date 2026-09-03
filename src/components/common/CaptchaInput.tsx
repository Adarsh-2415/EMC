import React, { useEffect, useRef } from 'react'
import { RefreshCw, AlertCircle } from 'lucide-react'

// eslint-disable-next-line react-refresh/only-export-components
export function generateCaptchaCode(length = 6): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

interface CaptchaInputProps {
  captchaCode: string
  onRefresh: () => void
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export const CaptchaInput: React.FC<CaptchaInputProps> = ({
  captchaCode,
  onRefresh,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height)
    bgGrad.addColorStop(0, '#f8fafc')
    bgGrad.addColorStop(0.5, '#e2e8f0')
    bgGrad.addColorStop(1, '#cbd5e1')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, width, height)

    // 2. Random Background Lines for Obfuscation
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(
        Math.random() * 100
      )}, ${Math.floor(Math.random() * 100)}, 0.25)`
      ctx.lineWidth = 1 + Math.random() * 2
      ctx.beginPath()
      ctx.moveTo(Math.random() * width, Math.random() * height)
      ctx.bezierCurveTo(
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height
      )
      ctx.stroke()
    }

    // 3. Random Background Noise Dots
    for (let i = 0; i < 35; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(
        Math.random() * 150
      )}, ${Math.floor(Math.random() * 150)}, 0.4)`
      ctx.beginPath()
      ctx.arc(Math.random() * width, Math.random() * height, 1 + Math.random(), 0, Math.PI * 2)
      ctx.fill()
    }

    // 4. Render Characters with Rotation & Colors
    const chars = captchaCode.split('')
    const charWidth = width / (chars.length + 1)
    const fontColors = ['#0f172a', '#047857', '#1e40af', '#334155', '#065f46']

    ctx.textBaseline = 'middle'
    ctx.font = 'bold 22px monospace, sans-serif'

    chars.forEach((char, index) => {
      ctx.save()
      const x = (index + 1) * charWidth
      const y = height / 2 + (Math.random() * 4 - 2)
      const angle = (Math.random() * 24 - 12) * (Math.PI / 180)

      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.fillStyle = fontColors[index % fontColors.length]
      ctx.shadowColor = 'rgba(0,0,0,0.15)'
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1
      ctx.fillText(char, -8, 0)
      ctx.restore()
    })
  }, [captchaCode])

  return (
    <div className="space-y-2">
      <label htmlFor="captchaInput" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        Security Verification (CAPTCHA) <span className="text-red-500">*</span>
      </label>

      {/* CAPTCHA Visual Box */}
      <div className="flex items-center gap-3 bg-slate-100 p-2.5 rounded-xl border border-slate-300">
        <div className="relative rounded-lg overflow-hidden border border-slate-300 shadow-inner bg-slate-200">
          <canvas
            ref={canvasRef}
            width={170}
            height={42}
            className="block select-none"
            aria-label={`CAPTCHA code: ${captchaCode}`}
          />
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={disabled}
          title="Refresh CAPTCHA Code"
          className="p-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4 text-slate-700" />
        </button>
      </div>

      {/* User Input Field */}
      <input
        id="captchaInput"
        type="text"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type the 6-character code shown above"
        maxLength={6}
        className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 uppercase tracking-widest font-mono ${
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
            : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
        }`}
      />

      {error && (
        <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
