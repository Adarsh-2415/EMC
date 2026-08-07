import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import slider1 from '@/assets/images/slider-1.jpg'
import { ShieldCheck, Award, Calendar, Users, ChevronRight, Play } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { MAIN_PAGES_SEO } from '@/constants/seoData'
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/utils/schemaGenerator'

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 text-slate-900">
      <SEO
        {...MAIN_PAGES_SEO.about}
        schemas={[
          generateOrganizationSchema(),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About EMC', url: '/about' },
          ]),
        ]}
      />
      {/* Section 1: Full-Width Static Hero Banner */}
      <section className="w-full relative bg-slate-950 text-white overflow-hidden min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center">
        <img
          src={slider1}
          alt="About Excel Management Certifications"
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
              <span className="text-emerald-400 font-semibold">About EMC</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>ESTABLISHED MAY 2015 | AUTONOMOUS BODY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              About EMC
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed">
              Pioneer in System Certification, Inspection, Technical Verification & Approved
              Professional Training Programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Unmodified Verbatim Text & Enterprise Credentials */}
      <section className="w-full bg-white border-b border-slate-200 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Verbatim Content (8 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Excel Management Certifications
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-slate-800 rounded-full" />
              </div>

              {/* Exact Paragraph 1 */}
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                Excel Management Certifications is one of the pioneer names in the system
                certification, training & Inspection business. Excel Management Certifications
                provides system certification according to ISO 9001; ISO 14001; ISO 22000: 2005;
                OHSAS 18001: 2007, IEC 60079 & other Global certifications worldwide. Excel
                Management Certifications is also providing IRCA / IEMA approved training courses
                for these entire standards. Excel Management Certifications is also providing
                services of Technical product /services Inspection, Verification & Compliance with
                a competent technical pool of auditors, experts & inspectors.
              </p>

              {/* Highlight callout box */}
              <div className="border-l-4 border-emerald-500 bg-slate-50 p-4 sm:p-5 rounded-r-xl my-4 text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                Authorized assessment body delivering IRCA & IEMA approved training, technical product
                inspection, and worldwide ISO compliance certification.
              </div>

              {/* Exact Paragraph 2 */}
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                Excel Management Certifications was formed in May 2015 for ISO 9000 (Quality
                Management Systems) & ISO 14000 (Environmental Management Systems) certifications. As
                an experienced certification body, Excel Management Certifications is authorized to
                assess quality standards. Excel Management Certifications has assisted various
                organizations in diverse sectors for enhancing and developing an effective
                management system that serves as a solid foundation, enabling them to compete in an
                increasingly complex business environment. Today, Excel Management Certifications
                is recognized as the global leader in the field of certification services.
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
                      <h4 className="text-xs font-bold uppercase text-slate-300">Approvals</h4>
                      <p className="text-sm text-slate-200">IRCA & IEMA Approved Training Courses</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300">Standards Scope</h4>
                      <p className="text-sm text-slate-200">
                        ISO 9001, ISO 14001, ISO 22000:2005, OHSAS 18001:2007, IEC 60079
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300">Expertise Pool</h4>
                      <p className="text-sm text-slate-200">
                        Competent Technical Pool of Auditors, Experts & Inspectors
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
                  Global Leader in Management System Certification Services
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Full-Width Corporate YouTube Video Showcase */}
      <section className="w-full bg-slate-950 text-white py-14 sm:py-18 md:py-22 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8 max-w-5xl mx-auto text-center"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <Play className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                <span>Corporate Overview & Auditing Practices</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Experience Excel Management Certifications
              </h2>

              <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                Watch our official organization video to learn more about our global auditing,
                inspection, and certification services.
              </p>
            </div>

            {/* Responsive YouTube Video Player Embed */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/Ws8xnDZWKQI?rel=0&modestbranding=1"
                title="Excel Management Certifications Corporate Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
