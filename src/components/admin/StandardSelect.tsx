import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Plus } from 'lucide-react'

// eslint-disable-next-line react-refresh/only-export-components
export const PREDEFINED_STANDARDS = [
  'ISO 9001:2015 QMS',
  'ISO 14001:2004 EMS',
  'ISO 18001:2007 OHSAS',
  'ISO 22000:2005 FSMS',
  'ISO/TS 16949',
  'ISO/IEC 27001:2005',
  'ISO/IEC 17025:2005',
  'WHO-GMP',
  'SA 8000',
  'ORGANIC CERTIFICATION',
  'ISO 45001:2018 OHSMS',
  'ISO/IEC 20000-1:2018',
  'ISO 50001:2011',
  'ISO 13485:2016',
] as const

interface StandardSelectProps {
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
}

export const StandardSelect: React.FC<StandardSelectProps> = ({
  value,
  onChange,
  disabled = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState(value)
  const [prevValue, setPrevValue] = useState(value)

  const containerRef = useRef<HTMLDivElement>(null)

  // Sync search when value prop changes (React recommended pattern)
  if (value !== prevValue) {
    setPrevValue(value)
    setSearch(value)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredStandards = PREDEFINED_STANDARDS.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase().trim())
  )

  const isCustomValue =
    search.trim() !== '' &&
    !PREDEFINED_STANDARDS.some((s) => s.toLowerCase() === search.toLowerCase().trim())

  const handleSelect = (selectedVal: string) => {
    onChange(selectedVal)
    setSearch(selectedVal)
    setIsOpen(false)
  }

  return (
    <div className="relative space-y-1" ref={containerRef}>
      <label htmlFor="standardSelect" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        Standard / Certification
      </label>

      <div className="relative">
        <input
          id="standardSelect"
          type="text"
          disabled={disabled}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            onChange(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Select or type a custom ISO standard..."
          className={`w-full pl-4 pr-10 py-3 rounded-xl border text-sm font-medium transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-500 bg-red-50/20'
              : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
          }`}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 py-1 text-xs select-none">
          {filteredStandards.map((std) => (
            <button
              key={std}
              type="button"
              onClick={() => handleSelect(std)}
              className="w-full text-left px-4 py-2.5 hover:bg-slate-100 flex items-center justify-between font-semibold text-slate-800 transition-colors"
            >
              <span>{std}</span>
              {value === std && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
            </button>
          ))}

          {isCustomValue && (
            <button
              type="button"
              onClick={() => handleSelect(search.trim())}
              className="w-full text-left px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 flex items-center gap-2 font-bold border-t border-emerald-200 transition-colors"
            >
              <Plus className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Use custom standard: &quot;{search.trim()}&quot;</span>
            </button>
          )}

          {filteredStandards.length === 0 && !isCustomValue && (
            <div className="px-4 py-3 text-slate-400 font-medium text-center">
              Type to add custom standard
            </div>
          )}
        </div>
      )}
    </div>
  )
}
