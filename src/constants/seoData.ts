export interface PageSeoConfig {
  title: string
  description: string
  keywords: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogType?: 'website' | 'article'
  ogImage?: string
  noindex?: boolean
}

export const BASE_URL = 'https://www.emcindia.org'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/EMC%20LOGO.png`
export const SITE_NAME = 'Excel Management Certifications'

export const MAIN_PAGES_SEO: Record<string, PageSeoConfig> = {
  home: {
    title: 'Excel Management Certifications | ISO Certification Body in India',
    description:
      'Excel Management Certifications (EMC) is a premier autonomous assessment and consultancy organization in India offering ISO 9001, ISO 14001, ISO 45001, ISO 27001 & CE Marking certifications.',
    keywords:
      'ISO Certification Body India, Excel Management Certifications, EMC, ISO 9001 Certification, ISO 14001, ISO 45001, ISO 27001, CE Marking, Certificate Verification',
    canonical: `${BASE_URL}/`,
    ogType: 'website',
  },
  about: {
    title: 'About Us | Excel Management Certifications (EMC)',
    description:
      'Established in May 2015, EMC is an autonomous research and development consultancy organization delivering independent auditing, assessment, and ISO certifications globally.',
    keywords:
      'About EMC, Excel Management Certifications company profile, ISO auditing organization, autonomous consultancy India',
    canonical: `${BASE_URL}/about`,
    ogType: 'website',
  },
  services: {
    title: 'ISO Certification Services & Compliance Audits | EMC',
    description:
      'Explore comprehensive ISO management system certification and product compliance auditing services including QMS, EMS, OH&S, ISMS, FSMS, CE Marking, and GMP.',
    keywords:
      'ISO Certification Services, Management System Certification, Product Certification, Quality Audits, Compliance Assessment',
    canonical: `${BASE_URL}/services`,
    ogType: 'website',
  },
  certificationSearch: {
    title: 'Verify ISO Certificate Online | Excel Management Certifications',
    description:
      'Verify the authenticity, registration status, and validity of ISO certificates issued by Excel Management Certifications online instantly by entering the Certificate Number.',
    keywords:
      'ISO Certificate Verification, Verify Certificate Online, EMC Certificate Search, Certificate Validity Check, Online ISO Verification',
    canonical: `${BASE_URL}/certification-search`,
    ogType: 'website',
  },
  apply: {
    title: 'Apply for ISO Certification Online | EMC Application Form',
    description:
      'Submit your online application for ISO 9001, ISO 14001, ISO 45001, ISO 27001, and product compliance certification. Fast and streamlined assessment process.',
    keywords:
      'Apply for ISO Certification, Online ISO Application Form, ISO Certification Process, EMC Application Portal',
    canonical: `${BASE_URL}/apply`,
    ogType: 'website',
  },
  training: {
    title: 'ISO Auditor Training Programs | Lead & Internal Auditor Courses',
    description:
      'Professional ISO Lead Auditor and Internal Auditor training programs for QMS, EMS, ISMS & OH&S standards. Enhance your auditing competencies with expert trainers.',
    keywords:
      'ISO Auditor Training, Lead Auditor Course, Internal Auditor Training, QMS Training, EMS Auditor Certification',
    canonical: `${BASE_URL}/training`,
    ogType: 'website',
  },
  support: {
    title: 'Customer Support & Helpdesk | Excel Management Certifications',
    description:
      'Get support for certification inquiries, audit scheduling, technical assistance, and general inquiries. Connect with EMC customer service team.',
    keywords:
      'EMC Customer Support, ISO Support Helpdesk, Certification Inquiries, Contact EMC',
    canonical: `${BASE_URL}/support`,
    ogType: 'website',
  },
  admin: {
    title: 'Admin Management Portal | EMC',
    description: 'Private Admin Management Portal for Excel Management Certifications.',
    keywords: '',
    canonical: `${BASE_URL}/admin/login`,
    noindex: true,
  },
}

export const SERVICE_SLUGS_SEO: Record<string, PageSeoConfig> = {
  'iso-9001-quality-management-system': {
    title: 'ISO 9001:2015 Quality Management System Certification | EMC',
    description:
      'Achieve ISO 9001 Quality Management System (QMS) certification with EMC. Enhance customer satisfaction, streamline operational workflows, and achieve global quality compliance.',
    keywords:
      'ISO 9001 Certification, Quality Management System, QMS 9001:2015, ISO 9001 Audit India, ISO Quality Certification',
    canonical: `${BASE_URL}/services/iso-9001-quality-management-system`,
    ogType: 'article',
  },
  'iso-14001-environmental-management-system': {
    title: 'ISO 14001:2015 Environmental Management System Certification | EMC',
    description:
      'Implement ISO 14001 Environmental Management System (EMS) to minimize environmental impacts, lower waste costs, and demonstrate green corporate compliance.',
    keywords:
      'ISO 14001 Certification, Environmental Management System, EMS 14001:2015, Environmental Compliance Audit',
    canonical: `${BASE_URL}/services/iso-14001-environmental-management-system`,
    ogType: 'article',
  },
  'iso-45001-occupational-health-and-safety': {
    title: 'ISO 45001:2018 Occupational Health & Safety Certification | EMC',
    description:
      'Protect your workforce and prevent workplace injuries with ISO 45001 Occupational Health & Safety Management System (OH&S) certification.',
    keywords:
      'ISO 45001 Certification, Occupational Health and Safety, OH&S Management System, Workplace Safety Certification',
    canonical: `${BASE_URL}/services/iso-45001-occupational-health-and-safety`,
    ogType: 'article',
  },
  'iso-27001-information-security-management': {
    title: 'ISO/IEC 27001 Information Security Management System | EMC',
    description:
      'Secure enterprise data assets, manage cyber risks, and maintain regulatory compliance with ISO/IEC 27001 Information Security Management System (ISMS) certification.',
    keywords:
      'ISO 27001 Certification, Information Security Management System, ISMS Audit, Cybersecurity ISO Certification',
    canonical: `${BASE_URL}/services/iso-27001-information-security-management`,
    ogType: 'article',
  },
  'iso-22000-food-safety-management-system': {
    title: 'ISO 22000:2018 Food Safety Management System Certification | EMC',
    description:
      'Ensure food safety throughout your supply chain with ISO 22000 FSMS certification. Demonstrate compliance with food hazards and international quality standards.',
    keywords:
      'ISO 22000 Certification, Food Safety Management System, FSMS Audit, Food Safety Standard',
    canonical: `${BASE_URL}/services/iso-22000-food-safety-management-system`,
    ogType: 'article',
  },
  'iso-13485-medical-devices-quality-management': {
    title: 'ISO 13485:2016 Medical Devices Quality Management System | EMC',
    description:
      'Ensure safety, reliability, and regulatory compliance for medical device manufacturing with ISO 13485 QMS certification.',
    keywords:
      'ISO 13485 Certification, Medical Device Quality Management, ISO Medical Devices, Healthcare QMS',
    canonical: `${BASE_URL}/services/iso-13485-medical-devices-quality-management`,
    ogType: 'article',
  },
  'iso-50001-energy-management-system': {
    title: 'ISO 50001:2018 Energy Management System Certification | EMC',
    description:
      'Optimize energy efficiency, reduce carbon footprint, and lower operational energy expenses with ISO 50001 EnMS certification.',
    keywords:
      'ISO 50001 Certification, Energy Management System, EnMS Audit, Energy Efficiency Standard',
    canonical: `${BASE_URL}/services/iso-50001-energy-management-system`,
    ogType: 'article',
  },
  'iso-20000-1-it-service-management': {
    title: 'ISO/IEC 20000-1 IT Service Management System Certification | EMC',
    description:
      'Deliver high-quality IT service delivery, reduce downtime, and align IT services with business objectives through ISO 20000-1 ITSM certification.',
    keywords:
      'ISO 20000 Certification, IT Service Management System, ITSM Audit, IT Quality Standards',
    canonical: `${BASE_URL}/services/iso-20000-1-it-service-management`,
    ogType: 'article',
  },
  'ce-marking-certification': {
    title: 'CE Marking Certification | European Conformity Product Assessment',
    description:
      'Attain CE Marking compliance to export products freely within the European Economic Area (EEA). Compliance assessment for safety, health, and environmental standards.',
    keywords:
      'CE Marking Certification, European Conformity, CE Product Compliance, CE Audit India',
    canonical: `${BASE_URL}/services/ce-marking-certification`,
    ogType: 'article',
  },
  'gmp-good-manufacturing-practice': {
    title: 'GMP Good Manufacturing Practice Certification | EMC Services',
    description:
      'Ensure products are consistently produced and controlled according to international quality standards with Good Manufacturing Practice (GMP) certification.',
    keywords:
      'GMP Certification, Good Manufacturing Practice, Quality Production Standards, GMP Audit',
    canonical: `${BASE_URL}/services/gmp-good-manufacturing-practice`,
    ogType: 'article',
  },
  'haccp-hazard-analysis-critical-control': {
    title: 'HACCP Hazard Analysis Critical Control Point Certification | EMC',
    description:
      'Identify and control biological, chemical, and physical food safety hazards with HACCP certification for food processors and manufacturers.',
    keywords:
      'HACCP Certification, Hazard Analysis Critical Control Point, Food Safety Audit, HACCP Compliance',
    canonical: `${BASE_URL}/services/haccp-hazard-analysis-critical-control`,
    ogType: 'article',
  },
  'halal-certification': {
    title: 'Halal Compliance Certification | EMC Certification Body',
    description:
      'Halal certification verifying that products and services meet Islamic dietary laws and manufacturing compliance requirements for global markets.',
    keywords:
      'Halal Certification, Halal Compliance Audit, Global Halal Standards',
    canonical: `${BASE_URL}/services/halal-certification`,
    ogType: 'article',
  },
  'rohs-restriction-of-hazardous-substances': {
    title: 'RoHS Certification | Restriction of Hazardous Substances',
    description:
      'Demonstrate compliance with electrical and electronic equipment environmental safety directives through RoHS restriction of hazardous substances certification.',
    keywords:
      'RoHS Certification, Restriction of Hazardous Substances, Electronics Environmental Compliance',
    canonical: `${BASE_URL}/services/rohs-restriction-of-hazardous-substances`,
    ogType: 'article',
  },
  'kosher-certification': {
    title: 'Kosher Compliance Certification | EMC Services',
    description:
      'Certified Kosher auditing ensuring food products conform to Jewish dietary regulations for domestic and international distribution.',
    keywords:
      'Kosher Certification, Kosher Compliance Audit, Kosher Food Standards',
    canonical: `${BASE_URL}/services/kosher-certification`,
    ogType: 'article',
  },
}
