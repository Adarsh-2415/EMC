import React from 'react'
import { motion } from 'framer-motion'
import { Award, Leaf, Users, ClipboardCheck, BarChart3 } from 'lucide-react'

export const IntroductionSection: React.FC = () => {
  const competencies = [
    { label: 'Environment Management', icon: Leaf },
    { label: 'Community Development', icon: Users },
    { label: 'Programme Evaluations', icon: ClipboardCheck },
    { label: 'Market Research', icon: BarChart3 },
  ]

  return (
    <section className="w-full bg-white border-b border-slate-200 py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Main Introduction Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-slate-800" aria-hidden="true" />
              <span>About Excel Management Certifications</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Introduction
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-slate-800 rounded-full" />
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal pt-2">
              Excel Management Certifications has been established as an autonomous research and
              development consultancy organization, comprising a team of dedicated young & senior
              professionals with the core competency of providing a wide range of research and
              consultancy services in diverse areas of environment management, community
              development projects and programme evaluations, and market research.
            </p>
          </div>

          {/* Right Column: Core Competency Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-300">
                  Established May 2015
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Autonomous Organization
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Core Competency Areas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {competencies.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                        <span className="text-xs font-medium text-slate-200">{item.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
                Dedicated team of young & senior technical professionals.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
