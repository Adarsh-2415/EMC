import React from 'react'
import { Outlet } from 'react-router-dom'
import { TopInfoBar } from './TopInfoBar'
import { Header } from './Header'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const GlobalLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      <TopInfoBar />
      <Header />
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
