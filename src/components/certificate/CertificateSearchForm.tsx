import React, { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

/* eslint-disable no-unused-vars */
interface CertificateSearchFormProps {
  onSearch: (certNo: string) => void
  isLoading: boolean
}
/* eslint-enable no-unused-vars */

export const CertificateSearchForm: React.FC<CertificateSearchFormProps> = ({
  onSearch,
  isLoading,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Automatically convert input to uppercase
    const upperValue = e.target.value.toUpperCase()
    setSearchValue(upperValue)
    if (error) {
      setError(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchValue.trim()
    if (!trimmed) {
      setError('Please enter a Certificate Number.')
      return
    }
    setError(null)
    onSearch(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
      <div className="space-y-2">
        <label
          htmlFor="certificateNumber"
          className="block text-xs font-bold uppercase tracking-wider text-slate-700"
        >
          Certificate Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="certificateNumber"
            type="text"
            required
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={isLoading}
            value={searchValue}
            onChange={handleChange}
            placeholder="Enter Your Certificate Number"
            className={`w-full px-4 py-3.5 rounded-xl border text-sm sm:text-base font-semibold tracking-wide transition-colors text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
                : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
            }`}
          />
        </div>
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading || !searchValue.trim()}
        className="w-full py-3.5 sm:py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-white" aria-hidden="true" />
            <span>Searching...</span>
          </>
        ) : (
          <>
            <Search className="w-4 h-4 text-white" aria-hidden="true" />
            <span>Search Certificate</span>
          </>
        )}
      </button>
    </form>
  )
}
