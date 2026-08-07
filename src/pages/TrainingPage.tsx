import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import slider4 from '@/assets/images/slider-4.jpg'
import { GraduationCap, Award, ShieldCheck, CheckCircle2, ChevronRight, FileCheck2, Globe2 } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { MAIN_PAGES_SEO } from '@/constants/seoData'
import { generateBreadcrumbSchema } from '@/utils/schemaGenerator'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const TrainingPage: React.FC = () => {
  const icabCourses = [
    'ISO 9001:2015 – Quality Management System.',
    'ISO 14001:2015 – Environment Management System.',
    'ISO 45001:2018 – Occupational Health & Safety Management System.',
    'ISO 22000:2018– Food Safety Management System.',
    'ISO 27001:2013 – Information Security Management System SIX SIGMA BLACK BELT.',
  ]

  const sisbelCourses = [
    'ISO 13485- Medical Devices Quality Management System.',
    'ISO 50001 – Energy Management System',
  ]

  return (
    <div className="w-full bg-slate-50 text-slate-900">
      <SEO
        {...MAIN_PAGES_SEO.training}
        schemas={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Personnel Certification & Training', url: '/training' },
          ]),
        ]}
      />
      {/* Section 1: Hero Banner */}
      <section className="w-full relative bg-slate-950 text-white overflow-hidden min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center">
        <img
          src={slider4}
          alt="Personnel Certification & Training"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-4 max-w-3xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-emerald-400 font-semibold">Training</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-xs">
              <GraduationCap className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>ICAB SWITZERLAND & SISBEL IPC APPROVED</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Training
            </h1>

            <p className="text-emerald-400 text-base sm:text-lg md:text-xl font-bold tracking-wide uppercase">
              PERSONNEL CERTIFICATION & TRAINING
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Lead Auditor Certification Programs & Approvals */}
      <section className="w-full bg-white border-b border-slate-200 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* ICAB Switzerland Section */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Globe2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                    International Approval
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    International Conformity Accreditation Bureau (ICAB)
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                EMC has international approvals from International Conformity Accreditation Bureau
                (ICAB) , Dammstrasse 19, CH-6300 Zug, Switzerland.
              </p>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-slate-200 font-medium">
                Lead Auditor Personnel Certification Program under “International Conformity
                Accreditation Bureau (ICAB)” Scheme for training courses for management systems.
              </div>
            </div>

            {/* ICAB Courses Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {icabCourses.map((course) => (
                <motion.div
                  key={course}
                  variants={itemVariants}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors flex items-start gap-3 shadow-xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-800 leading-snug">
                    {course}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* SISBEL IPC Section */}
          <div className="space-y-6 pt-4 border-t border-slate-200">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-blue-400">
                    IPC Full Member Approval
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    SISBEL Lead Auditor Program
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Lead Auditor Training program under approval from SISBEL , full member of IPC.
              </p>
            </div>

            {/* SISBEL Courses Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {sisbelCourses.map((course) => (
                <motion.div
                  key={course}
                  variants={itemVariants}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors flex items-start gap-3 shadow-xs"
                >
                  <FileCheck2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-800 leading-snug">
                    {course}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: ISO Internal Auditor Training Guide */}
      <section className="w-full bg-slate-50 border-b border-slate-200 py-14 sm:py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto bg-white p-6 sm:p-10 md:p-12 rounded-2xl shadow-xl border border-slate-200/80 space-y-6"
          >
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Auditing Competency Guide</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ISO Internal Auditor Training
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-slate-800 rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
              Internal auditing is an independent, objective assurance and consulting activity
              designed to add value and improve an organization’s operations. It helps an
              organization accomplish its objectives by bringing a systematic, disciplined approach
              to evaluating and improving the effectiveness of risk management, control, and
              governance processes.[1] Internal auditing is a catalyst for improving an
              organization’s effectiveness and efficiency by providing insight and recommendations
              based on analysis and assessments of data and business processes. With a commitment
              to integrity and accountability, internal auditing provides value to governing bodies
              and senior management as an objective source of independent advice. Professionals
              called internal auditors are employed by organizations to perform internal auditing
              activities.
            </p>

            {/* Paragraph 2 - Highlight Callout */}
            <div className="border-l-4 border-emerald-500 bg-slate-50 p-5 rounded-r-xl text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
              The scope of internal auditing within an organization is broad and may involve topics
              such as the efficiency of operations, the reliability of financial reporting, deterring
              and investigating fraud, safeguarding assets, and compliance with laws and regulations.
            </div>

            {/* Paragraph 3 */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              Internal auditing frequently involves measuring compliance with the entity’s policies and
              procedures. However, internal auditors are not responsible for the execution of company
              activities; they advise management and the Board of Directors (or similar oversight body)
              regarding how to better execute their responsibilities. As a result of their broad scope
              of involvement, internal auditors may have a variety of higher educational and
              professional backgrounds
            </p>

            {/* Paragraph 4 - Dark Executive Auditor Box */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-xl border border-slate-800 space-y-3 shadow-md mt-6">
              <h3 className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                Certified Quality Auditor (CQA) Competency
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                The Certified Quality Auditor is a professional who understands the standards and
                principles of auditing and the auditing techniques of examining, questioning,
                evaluating, and reporting to determine a quality system’s adequacy and deficiencies.
                The Certified Quality Auditor analyzes all elements of a quality system and judges its
                degree of adherence to the criteria of industrial management and quality evaluation
                and control systems.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
