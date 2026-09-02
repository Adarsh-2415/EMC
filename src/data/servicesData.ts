export interface ServiceDetail {
  slug: string
  title: string
  subtitle: string
  category: string
  description: string[]
  subPoints?: string[]
  applicableHeading: string
  applicableItems: string[]
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  'iso-9001-2015': {
    slug: 'iso-9001-2015',
    title: 'ISO 9001:2015 QMS',
    subtitle: 'Quality Management Systems',
    category: 'Management Systems',
    description: [
      'ISO 9001:2015 QMS Attaining ISO 9001 certification is a first step to win over the confidence and trust of your customers. Moreover, quality is a foremost factor that attracts customers towards a product. Therefore, ISO certification gives fuller assurance of quality of products that a company offers. ISO 9001 certification attach utmost importance to quality management systems and in attaining complete satisfaction of the customers. Excel Management certifications provide highly professional services for ISO certification.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: [
      'All types of organizations are it small, medium or large in any of the sectors.',
    ],
  },
  'iso-14001-2015': {
    slug: 'iso-14001-2015',
    title: 'ISO 14001:2015 EMS',
    subtitle: 'Environmental Management Systems',
    category: 'Management Systems',
    description: [
      'ISO 14001:2015 specifies the requirements for an environmental management system that an organization can use to enhance its environmental performance. ISO 14001:2015 is intended for use by an organization seeking to manage its environmental responsibilities in a systematic manner that contributes to the environmental pillar of sustainability.',
      'Consistent with the organization’s environmental policy, the intended outcomes of an environmental management system include enhancement of environmental performance, fulfillment of compliance obligations, and achievement of environmental objectives.',
    ],
    applicableHeading: 'Appropriate For :',
    applicableItems: [
      'All organizations regardless of size, type and nature, seeking to manage environmental responsibilities.',
    ],
  },
  'iso-45001-2018': {
    slug: 'iso-45001-2018',
    title: 'ISO 45001:2018 OHSMS',
    subtitle: 'Occupational Health and Safety Management Systems',
    category: 'Management Systems',
    description: [
      'Occupational health and safety management systems',
      'ISO 45001:2018 specifies requirements for an occupational health and safety (OH&S) management system, and gives guidance for its use, to enable organizations to provide safe and healthy workplaces by preventing work-related injury and ill health, as well as by proactively improving its OH&S performance. (ISO 45001 fully replaces the withdrawn OHSAS 18001:2007 standard).',
      'ISO 45001:2018 is applicable to any organization that wishes to establish, implement and maintain an OH&S management system to improve occupational health and safety, eliminate hazards and minimize OH&S risks.',
    ],
    subPoints: [
      'a) continual improvement of OH&S performance;',
      'b) fulfillment of legal requirements and other requirements;',
      'c) achievement of OH&S objectives.',
    ],
    applicableHeading: 'Applicable :',
    applicableItems: [
      'is applicable to any organization regardless of its size, type, and activities.',
      'enables an organization, through its OH&S management system, to integrate other aspects of health and safety.',
    ],
  },
  'iso-22000-2018': {
    slug: 'iso-22000-2018',
    title: 'ISO 22000:2018 FSMS',
    subtitle: 'Food Safety Management System',
    category: 'Food & Manufacturing',
    description: [
      'ISO 22000:2018 enlists the specific requirements of a food safety management system thus ensuring food safety till the final point of food consumption. The implementation of ISO 22000:2018 certification will make it way easier for organizations to effectively implement the Codex HACCP (Hazard Analysis and Critical Control Point) system for food hygiene.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: [
      'All types of organizations such as primary producers, food manufacturers, feed producers, transport and food service outlets etc.',
    ],
  },
  'iatf-16949-2016': {
    slug: 'iatf-16949-2016',
    title: 'IATF 16949:2016',
    subtitle: 'Automotive Quality Management System',
    category: 'Automotive',
    description: [
      'IATF 16949:2016 is the global automotive industry standard for Quality Management Systems. Replaces the former ISO/TS 16949 technical specification. IATF 16949 emphasizes the development of a process-oriented quality management system that provides for continual improvement, defect prevention and reduction of variation and waste in the automotive supply chain.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: ['Automotive supply chain and automobile parts manufacturers.'],
  },
  'iso-27001-2022': {
    slug: 'iso-27001-2022',
    title: 'ISO/IEC 27001:2022 ISMS',
    subtitle: 'Information Security Management System',
    category: 'Information & IT',
    description: [
      'ISO/IEC 27001:2022 is the international standard for Information Security Management Systems (ISMS). This helps organizations effectively manage information security risks and demonstrate to clients that robust processes are in place to safeguard confidential data assets.',
    ],
    applicableHeading: 'Effective For :',
    applicableItems: [
      'Small or large organizations where information protection is highly important such as health sector, finance sector, IT sector etc.',
      'Companies who manage data databases on behalf of others like IT sourcing companies.',
    ],
  },
  'iso-17025-2017': {
    slug: 'iso-17025-2017',
    title: 'ISO/IEC 17025:2017',
    subtitle: 'Testing and Calibration Laboratories Competence',
    category: 'Laboratory & Testing',
    description: [
      'ISO/IEC 17025:2017 specifies the general requirements for the competence, impartiality and consistent operation of testing and calibration laboratories. It enables laboratories to demonstrate that they operate competently and generate valid results, thereby promoting confidence in their work both nationally and around the world.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: [
      'All types of laboratories where testing, calibration or sampling forms part of operations.',
    ],
  },
  'who-gmp': {
    slug: 'who-gmp',
    title: 'WHO-GMP',
    subtitle: 'Good Manufacturing Practice',
    category: 'Food & Manufacturing',
    description: [
      'GMP stands for Good Manufacturing Practice. Implementation of WHO-GMP certification ensures that products are consistently produced and controlled according to quality standards.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: ['Food production.', 'Pharmaceutical industry.', 'Biotech & cosmetics.'],
  },
  'sa-8000': {
    slug: 'sa-8000',
    title: 'SA 8000',
    subtitle: 'Social Accountability 8000',
    category: 'Social Responsibility',
    description: [
      'SA 8000 is an international certification standard that encourages organizations to develop, maintain, and apply socially acceptable practices in the workplace.',
    ],
    applicableHeading: 'Recognized By :',
    applicableItems: [
      'Trade unions.',
      'Government agencies.',
      'Non-governmental organizations (NGOs).',
    ],
  },
  'organic-certification': {
    slug: 'organic-certification',
    title: 'Organic Certification',
    subtitle: 'Organic Agriculture & Ecological Balance',
    category: 'Food & Manufacturing',
    description: [
      'Organic Agriculture is an environment-friendly ecological production system that advances and enhances biological cycles, biodiversity and biological activities.',
    ],
    applicableHeading: 'Ideal For :',
    applicableItems: [
      'Farmers',
      'Farmer societies/groups',
      'State agencies',
      'Processors and exporters',
    ],
  },
  'iso-20000-1-2018': {
    slug: 'iso-20000-1-2018',
    title: 'ISO/IEC 20000-1:2018',
    subtitle: 'Information Technology Service Management Systems',
    category: 'Information & IT',
    description: [
      'ISO/IEC 20000-1:2018 specifies requirements for an organization to establish, implement, maintain and continually improve a service management system (SMS).',
    ],
    applicableHeading: 'Applicable: ',
    applicableItems: [
      'Internal or external IT service providers delivering IT services to business organizations.',
    ],
  },
  'iso-50001-2018': {
    slug: 'iso-50001-2018',
    title: 'ISO 50001:2018 EnMS',
    subtitle: 'Energy Management Systems',
    category: 'Management Systems',
    description: [
      'ISO 50001:2018 specifies requirements for establishing, implementing, maintaining and improving an energy management system (EnMS). The intended outcome is to enable an organization to follow a systematic approach in achieving continual improvement of energy performance.',
    ],
    applicableHeading: 'Applicable:',
    applicableItems: [
      'Applicable to any organization regardless of its type, size, complexity, geographical location, or energy consumed.',
    ],
  },
  'iso-13485-2016': {
    slug: 'iso-13485-2016',
    title: 'ISO 13485:2016',
    subtitle: 'Medical Devices Quality Management Systems',
    category: 'Medical Devices',
    description: [
      'ISO 13485:2016 specifies requirements for a quality management system where an organization needs to demonstrate its ability to provide medical devices and related services.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: [
      'Medical device manufacturers, distributors, installers, technical support providers, and supply chain partners.',
    ],
  },
}

// Add Legacy Slugs Aliases for backward compatibility
SERVICES_DATA['iso-14001-2004'] = SERVICES_DATA['iso-14001-2015']
SERVICES_DATA['iso-18001-2007'] = SERVICES_DATA['iso-45001-2018']
SERVICES_DATA['iso-22000-2005'] = SERVICES_DATA['iso-22000-2018']
SERVICES_DATA['iso-ts-16949'] = SERVICES_DATA['iatf-16949-2016']
SERVICES_DATA['iso-27001-2005'] = SERVICES_DATA['iso-27001-2022']
SERVICES_DATA['iso-17025-2005'] = SERVICES_DATA['iso-17025-2017']
SERVICES_DATA['iso-50001-2011'] = SERVICES_DATA['iso-50001-2018']
