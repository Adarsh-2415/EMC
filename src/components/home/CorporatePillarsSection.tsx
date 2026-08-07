import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Target, Award, ShieldCheck, Sparkles } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}

export const CorporatePillarsSection: React.FC = () => {
  return (
    <section className="w-full bg-slate-50/80 border-b border-slate-200 py-14 sm:py-18 md:py-22 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center space-y-3 mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-slate-800" aria-hidden="true" />
            <span>Corporate Strategy & Quality Commitment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Vision, Mission & Quality Policy
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 via-blue-600 to-slate-800 mx-auto rounded-full" />
        </motion.div>

        {/* 3-Card Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1: Vision */}
          <motion.div
            variants={cardVariants}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/80 border-l-4 border-l-emerald-500 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                <Target className="w-6 h-6" aria-hidden="true" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600">
                  Strategic Horizon
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Vision</h3>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal pt-1">
                We are dedicated to profitably increase our market share by strengthening our
                customer and supplier relationships.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 text-xs text-slate-400 font-medium">
              Partnership & Market Excellence
            </div>
          </motion.div>

          {/* Card 2: Mission */}
          <motion.div
            variants={cardVariants}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/80 border-l-4 border-l-blue-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
                <Award className="w-6 h-6" aria-hidden="true" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-bold text-blue-600">
                  Operational Purpose
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Mission</h3>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal pt-1">
                To ensure the enhancement and continual improvement in the operational and quality
                efficiency through the value added, competitive, result oriented auditing practices
                to achieve international recognition for excellence of Management System
                Certification.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 text-xs text-slate-400 font-medium">
              Continual Audit Optimization
            </div>
          </motion.div>

          {/* Card 3: Quality Policy */}
          <motion.div
            variants={cardVariants}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/80 border-l-4 border-l-slate-800 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900/10 border border-slate-800/20 flex items-center justify-center text-slate-800">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-800">
                  Quality Assurance
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Quality Policy</h3>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal pt-1">
                To ensure the enhancement and continual improvement in the operational and quality
                efficiency through the value added, competitive, result oriented auditing practices
                to achieve international recognition for excellence of Management System
                Certification.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 text-xs text-slate-400 font-medium">
              International Recognition
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
