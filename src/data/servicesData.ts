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
  'iso-14001-2004': {
    slug: 'iso-14001-2004',
    title: 'ISO 14001:2004 EMS',
    subtitle: 'Environmental Management Systems',
    category: 'Management Systems',
    description: [
      'The company specializes in offering dependable services for procuring RC 14001 and RCMS certification. In simple terms, RC 14001 and RCMS are both an environmental, health, safety and security management system suitable Chemical Industry. Responsible Care (RC) is all-inclusive health, environmental, safety and security performance improvement initiative. The Responsible Care Management System (RCMS) on the other hand is based on benchmarked best practices of top private sector companies, processes developed through the Global Environmental Management Initiative, International Standards Organization and other bodies, and requirements of national regulatory authorities.',
    ],
    applicableHeading: 'Appropriate For :',
    applicableItems: ['Chemical manufacturing companies.'],
  },
  'iso-18001-2007': {
    slug: 'iso-18001-2007',
    title: 'ISO 18001:2007 OHSAS',
    subtitle: 'Occupational Health and Safety Management System',
    category: 'Management Systems',
    description: [
      'OHSAS 18001 is an Occupational Health and Safety Management System. We provide effective services for OHSAS 18001certification. The implementation of OHSAS 18001certification implies a safe working environment for the employees and the nearby environment thus ensuring that your prime concern is health and safety of the employees. Adhering to regulatory/legislative requirements and persistent improvements are important aspects of OHSAS 18001. For easy integration, OHSAS 18001 has been formed in confirmation with ISO 14001 and ISO 9001.',
    ],
    applicableHeading: 'Applicable For Companies with a :',
    applicableItems: ['Huge workforce.', 'Heavy or manual job.', 'Riskier environments.'],
  },
  'iso-22000-2005': {
    slug: 'iso-22000-2005',
    title: 'ISO 22000:2005 FSMS',
    subtitle: 'Food Safety Management System',
    category: 'Food & Manufacturing',
    description: [
      'ISO 22000 enlists the specific requirements of a food safety management system thus ensuring food safety till the final point of food consumption. The implementation of ISO 22000 certification will make it way easier for the organizations for effective implementation of the Codex HACCP (Hazard Analysis and Critical Control Point) system for food hygiene. ISO 22000 is actually associated with ISO 9001 to increase the compatibility of the food safety management system. So, we offer expert help for ISO 22000 certification.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: [
      'All types of organizations such as primary producers, food manufacturers, feed producers, transport and food service outlets etc.',
    ],
  },
  'iso-ts-16949': {
    slug: 'iso-ts-16949',
    title: 'ISO/TS 16949',
    subtitle: 'Automotive Quality Management',
    category: 'Automotive',
    description: [
      'The company renders effective services for ISO/TS 16949 certification. ISO/TS 16949 stands for Technical Specifications that was developed for Automobile Suppliers. The implementation of ISO/ TS 16949 certification is as per ISO 9000 standard certification and ensures an organization to meet the most rigorous quality norms. The technical specifications carefully analyze the commitment of an organization to quality in terms of raw materials, aggregates and body parts used by the automotive industry.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: ['Automotive supply chain and automobile industry.'],
  },
  'iso-27001-2005': {
    slug: 'iso-27001-2005',
    title: 'ISO/IEC 27001:2005',
    subtitle: 'Information Security Management System',
    category: 'Information & IT',
    description: [
      'ISO/IEC 27001 implies Information Security Management System and FSIR renders services for ISO/IEC 27001 certification. This helps the company to effectively manage their information security and show to their customers that their processes are secured to protect all kinds of information. Information Security Management System comprises of all the technical details and human aspects in all the operation processes. The implementation of ISO/IEC 27001 certification provides a comprehensive platform for ensuring confidence in inter-organizational dealings and developing organizational security.',
    ],
    applicableHeading: 'Effective For :',
    applicableItems: [
      'Small or large organizations where information protection is highly important such as health sector, finance sector, IT sector etc.',
      'Companies who manage the entire information database on behalf of others like IT sourcing companies.',
    ],
  },
  'iso-17025-2005': {
    slug: 'iso-17025-2005',
    title: 'ISO/IEC 17025:2005',
    subtitle: 'Laboratory Testing & Calibration Competence',
    category: 'Laboratory & Testing',
    description: [
      'The company specializes in providing professional services for ISO/IEC 17025:2005 certification. ISO/IEC 17025:2005 gives an authority to undertake tests or calibrations also including sampling. The implementation of ISO/IEC 17025:2005 certification is for laboratory use to effectively develop the management system for technical, quality and administrative operations. Safety and regulatory requirements of laboratories are not covered in this certification.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: [
      'All types of laboratories where testing or calibration forms part of product certification and inspection',
    ],
  },
  'who-gmp': {
    slug: 'who-gmp',
    title: 'WHO-GMP',
    subtitle: 'Good Manufacturing Practice',
    category: 'Food & Manufacturing',
    description: [
      'GMP stands for Good manufacturing practice. Implementation of WHO-GMP certification ensures that the products are produced and controlled as per a set of quality standards and correct procedures are followed in the entire production process. WHO has given effective guidelines for GMP. We also provide services for WHO-GMP certification.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: ['Food production.', 'Pharmaceutical industry.', 'Biotech cosmetic.'],
  },
  'sa-8000': {
    slug: 'sa-8000',
    title: 'SA 8000',
    subtitle: 'Social Accountability 8000',
    category: 'Social Responsibility',
    description: [
      'The full-form of SA 8000 is “Social Accountability 8000“. SA 8000 was developed to encourage socially accountable business in all sectors around the globe. SA 8000 sets out standards concerning forced labour, freedom of association, health and safety, child labour, disciplinary practices, discrimination, working hours and compensation together with the management systems to deliver them. It also covers all the chief labour right issues enclosed in the International Labour Organization (ILO) conventions, the Universal Declaration of Human Rights and the UN Convention on the Rights of the Child. We offer expert help for procuring SA 8000 certification for your organization.',
    ],
    applicableHeading: 'SA 8000 Is Recognized By :',
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
      'Organic Agriculture is an environment-friendly ecological production system that advances and enhances biological cycles, biodiversity and biological activities. The system is based on negligible use of off-farm inputs and management practices that refurbishes, maintains and augments ecological balance. The primary goal of organic agriculture is to optimize the health and yield of interdependent communities of plants, soil life, animals and people. We are a name to reckon with for securing Organic Certification for your business.',
    ],
    applicableHeading: 'Ideal For :',
    applicableItems: [
      'The farmers',
      'Farmer’s societies/groups',
      'State agencies',
      'Processors and exporters',
    ],
  },
  'iso-45001-2018': {
    slug: 'iso-45001-2018',
    title: 'ISO 45001:2018 OHSMS',
    subtitle: 'Occupational Health and Safety Management Systems',
    category: 'Management Systems',
    description: [
      'Occupational health and safety management systems',
      'ISO 45001:2018 specifies requirements for an occupational health and safety (OH&S) management system, and gives guidance for its use, to enable organizations to provide safe and healthy workplaces by preventing work-related injury and ill health, as well as by proactively improving its OH&S performance.',
      'ISO 45001:2018 is applicable to any organization that wishes to establish, implement and maintain an OH&S management system to improve occupational health and safety, eliminate hazards and minimize OH&S risks (including system deficiencies), take advantage of OH&S opportunities, and address OH&S management system nonconformities associated with its activities.',
      'ISO 45001:2018 helps an organization to achieve the intended outcomes of its OH&S management system. Consistent with the organization’s OH&S policy, the intended outcomes of an OH&S management system include:',
    ],
    subPoints: [
      'a) continual improvement of OH&S performance;',
      'b) fulfillment of legal requirements and other requirements;',
      'c) achievement of OH&S objectives.',
    ],
    applicableHeading: 'Applicable :',
    applicableItems: [
      'is applicable to any organization regardless of its size, type, and activities. It is applicable to the OH&S risks under the organization’s control, taking into account factors such as the context in which the organization operates and the needs and expectations of its workers and other interested parties.',
      'enables an organization, through its OH&S management system, to integrate other aspects of health and safety, such as worker wellness/wellbeing.',
      'can be used in whole or in part to systematically improve occupational health and safety management. However, claims of conformity to this document are not acceptable unless all its requirements are incorporated into an organization’s OH&S management system and fulfilled without exclusion.',
    ],
  },
  'iso-20000-1-2018': {
    slug: 'iso-20000-1-2018',
    title: 'ISO/IEC 20000-1:2018',
    subtitle: 'Information Technology Service Management Systems',
    category: 'Information & IT',
    description: [
      'Information Technology Service Management Systems',
      'This document specifies requirements for an organization to establish, implement, maintain and continually improve a service management system (SMS). The requirements specified in this document include the planning, design, transition, delivery, and improvement of services to meet the service requirements and deliver value. This document can be used by:',
    ],
    subPoints: [
      'a customer seeking services and requiring assurance regarding the quality of those services;',
      'a customer requiring a consistent approach to the service lifecycle by all its service providers, including those in a supply chain;',
      'an organization to demonstrate its capability for the planning, design, transition, delivery, and improvement of services;',
      'an organization to monitor, measure and review its SMS and the services;',
      'an organization to improve the planning, design, transition, delivery, and improvement of services through effective implementation and operation of an SMS.',
      'an organization or other party performing conformity assessments against the requirements specified in this document;',
      'a provider of training or advice in service management.',
    ],
    applicableHeading: 'Applicable: ',
    applicableItems: [
      'The term “service” as used in this document refers to the service or services in the scope of the SMS. The term “organization” as used in this document refers to the organization in the scope of the SMS that manages and delivers services to customers. The organization in the scope of the SMS can be part of a larger organization, for example, a department of a large corporation. An organization or part of an organization that manages and delivers a service or services to internal or external customers can also be known as a service provider. Any use of the terms “service” or “organization” with a different intent is distinguished clearly in this document.',
    ],
  },
  'iso-50001-2011': {
    slug: 'iso-50001-2011',
    title: 'ISO 50001:2011',
    subtitle: 'Energy Management Systems',
    category: 'Management Systems',
    description: [
      'Energy management systems',
      'This specifies requirements for establishing, implementing, maintaining and improving an energy management system (EnMS). The intended outcome is to enable an organization to follow a systematic approach in achieving continual improvement of energy performance and the EnMS.',
    ],
    applicableHeading: 'Applicable:',
    applicableItems: [
      'is applicable to any organization regardless of its type, size, complexity, geographical location, organizational culture or the products and services it provides;',
      'is applicable to activities affecting energy performance that are managed and controlled by the organization;',
      'is applicable irrespective of the quantity, use, or types of energy consumed;',
      'requires demonstration of continual energy performance improvement, but does not define levels of energy performance improvement to be achieved;',
      'can be used independently, or be aligned or integrated with other management systems.',
    ],
  },
  'iso-13485-2016': {
    slug: 'iso-13485-2016',
    title: 'ISO 13485:2016',
    subtitle: 'Medical Devices Quality Management Systems',
    category: 'Medical Devices',
    description: [
      'Medical Devices Quality management systems',
      'ISO 13485:2016 specifies requirements for a quality management system where an organization needs to demonstrate its ability to provide medical devices and related services that consistently meet customer and applicable regulatory requirements. Such organizations can be involved in one or more stages of the life-cycle, including design and development, production, storage and distribution, installation, or servicing of a medical device and design and development or provision of associated activities (e.g. technical support). ISO 13485:2016 can also be used by suppliers or external parties that provide product, including quality management system-related services to such organizations.',
      'Requirements of ISO 13485:2016 are applicable to organizations regardless of their size and regardless of their type except where explicitly stated. Wherever requirements are specified as applying to medical devices, the requirements apply equally to associated services as supplied by the organization.',
      'The processes required by ISO 13485:2016 that are applicable to the organization, but are not performed by the organization, are the responsibility of the organization and are accounted for in the organization’s quality management system by monitoring, maintaining, and controlling the processes.',
    ],
    applicableHeading: 'Applicable For :',
    applicableItems: [
      'Medical device manufacturers, distributors, installers, technical support providers, and supply chain partners.',
    ],
  },
}
