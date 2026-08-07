import React from 'react'
import headerBanner from '@/assets/images/header-banner.png'

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200 py-2 sm:py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <img
          src={headerBanner}
          alt="Excel Management Certifications"
          className="w-full max-w-7xl h-auto object-contain block"
          loading="eager"
        />
      </div>
    </header>
  )
}
