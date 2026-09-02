import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import headerBanner from '@/assets/images/header-banner.png'
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Calendar,
  Users,
} from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { MAIN_PAGES_SEO } from '@/constants/seoData'
import { generateBreadcrumbSchema } from '@/utils/schemaGenerator'

export const AboutPage: React.FC = () => {
  const coreCompetencies = [
    'Established in May 2015 as an Autonomous System Certification Body.',
    'System Certification for ISO 9001:2015, ISO 14001:2015, ISO 22000:2018 & ISO 45001:2018.',
    'Technical Product & Services Inspection, Verification & Compliance.',
    'Recognized Auditor & Personnel Training Courses (IRCA, IEMA, ICAB & SISBEL).',
    'Competent Technical Pool of Auditors, Experts & Inspectors Worldwide.',
  ]

  return (
    <div className="w-full bg-slate-50 text-slate-900">
      <SEO
        {...MAIN_PAGES_SEO.about}
        schemas={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About EMC', url: '/about' },
          ]),
        ]}
      />
      {/* Section 1: Hero Banner */}
      <section className="w-full relative bg-slate-950 text-white overflow-hidden min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center">
        <img
          src={headerBanner}
          alt="About Excel Management Certifications Header Banner"
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
              <span className="text-emerald-400 font-semibold">About Us</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-xs">
              <Award className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>ESTABLISHED MAY 2015 • SYSTEM CERTIFICATION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              About Us
            </h1>

            <p className="text-emerald-400 text-base sm:text-lg md:text-xl font-bold tracking-wide uppercase">
              EXCEL MANAGEMENT CERTIFICATIONS
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Main Profile & Credentials */}
      <section className="w-full bg-white border-b border-slate-200 py-14 sm:py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Detailed Copy (8 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600">
                  System Certification, Training & Technical Inspection
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Excel Management Certifications
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-slate-800 rounded-full" />
              </div>

              {/* Corrected Paragraph 1 */}
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                Established in May 2015, Excel Management Certifications is an experienced certification
                body in system certification, training & inspection business. Excel Management Certifications
                provides system certification according to ISO 9001:2015, ISO 14001:2015, ISO 22000:2018,
                ISO 45001:2018, ISO/IEC 27001:2022, ISO 50001:2018, IEC 60079 & other global certifications worldwide.
                Excel Management Certifications provides IRCA / IEMA approved training courses for these standards,
                alongside technical product/services inspection, verification & compliance with a competent pool of
                auditors, experts & inspectors.
              </p>

              {/* Highlight callout box */}
              <div className="border-l-4 border-emerald-500 bg-slate-50 p-4 sm:p-5 rounded-r-xl my-4 text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                Authorized assessment body delivering IRCA, IEMA, ICAB & SISBEL recognized training, technical product
                inspection, and worldwide ISO management system certifications.
              </div>

              {/* Corrected Paragraph 2 */}
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                Excel Management Certifications was formed in May 2015 for Quality Management Certification and
                Consultancy Process. As an experienced certification body, Excel Management Certifications is
                authorized to assess quality standards across diverse industry sectors, enhancing management systems
                to build a resilient foundation for competing in a complex global market.
              </p>
            </motion.div>

            {/* Right Column: Credential Sidebar (4 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="lg:col-span-4"
            >
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-300">
                    Key Credentials
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    Est. May 2015
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300">Formed</h4>
                      <p className="text-sm text-slate-200">May 2015</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300">Approvals & Recognitions</h4>
                      <p className="text-sm text-slate-200">IRCA, IEMA, ICAB & SISBEL Recognized Training</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300">Standards Scope</h4>
                      <p className="text-sm text-slate-200">
                        ISO 9001:2015, ISO 14001:2015, ISO 22000:2018, ISO 45001:2018, ISO/IEC 27001:2022, ISO 50001:2018
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300">Expertise Pool</h4>
                      <p className="text-sm text-slate-200">
                        Auditors, Technical Experts & Inspectors
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Core Competencies Grid */}
      <section className="w-full bg-slate-50 py-14 sm:py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-600">
              Why Partner With EMC
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Core Operational Competencies
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-slate-800 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreCompetencies.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug pt-2">{item}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex items-center justify-between"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-emerald-400">Global Recognition</h4>
                <p className="text-xs text-slate-300">Delivering value-added compliance worldwide.</p>
              </div>
              <Globe2 className="w-8 h-8 text-emerald-400 shrink-0" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
