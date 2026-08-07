import React from 'react'
import { HeroSlider } from '@/components/home/HeroSlider'
import { IntroductionSection } from '@/components/home/IntroductionSection'
import { CorporatePillarsSection } from '@/components/home/CorporatePillarsSection'
import { SEO } from '@/components/common/SEO'
import { MAIN_PAGES_SEO } from '@/constants/seoData'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/utils/schemaGenerator'

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        {...MAIN_PAGES_SEO.home}
        schemas={[generateOrganizationSchema(), generateWebSiteSchema()]}
      />
      <h1 className="sr-only">
        Excel Management Certifications - Autonomous Assessment & ISO Certification Body in India
      </h1>
      <HeroSlider />
      <IntroductionSection />
      <CorporatePillarsSection />
    </>
  )
}
