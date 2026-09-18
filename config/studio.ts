export interface BuildProject {
  id: string;
  projectNumber: string;
  vehicleName: string;
  year: number;
  subtitle: string;
  category: 'Performance' | 'Widebody' | 'Restoration' | 'OEM+';
  powerHp: number;
  torqueNm: number;
  buildTimeDays: number;
  modificationsCount: number;
  heroImage: string;
  beforeImage: string;
  afterImage: string;
  summary: string;
  originalCondition: string;
  workCompleted: string[];
  partsInstalled: string[];
  paintFinish: string;
  performanceSpecs: {
    engine: string;
    transmission: string;
    zeroToSixty: string;
    topSpeed: string;
  };
}

export interface ReviewItem {
  id: string;
  name: string;
  vehicle: string;
  service: string;
  rating: number;
  review: string;
  thumbnail: string;
}

export interface DetailingHotspot {
  id: string;
  label: string;
  headline: string;
  description: string;
  position3D: [number, number, number]; // [x, y, z] on the car
  cameraTarget: [number, number, number];
  metrics: string;
}

export const STUDIO_CONFIG = {
  BUSINESS_NAME: 'APEX CRAFT & WORKS',
  TAGLINE: 'CRAFTED FOR MACHINES.',
  HERO_HEADLINE: 'BUILT BEYOND STOCK.',
  HERO_SUBTITLE: 'Performance. Precision. Presence.',
  PHONE: process.env.NEXT_PUBLIC_STUDIO_PHONE || '+1 (555) 019-2834',
  WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+15550192834',
  EMAIL: process.env.NEXT_PUBLIC_STUDIO_EMAIL || 'concierge@apexstudio.automotive',
  ADDRESS: process.env.NEXT_PUBLIC_STUDIO_ADDRESS || '742 Performance Way, Hangar 4B, Los Angeles, CA 90021',
  OPENING_HOURS: 'Mon – Sat: 08:00 – 19:00 PST (By Appointment Only)',
  HOURS: {
    WEEKDAYS: '08:00 – 19:00 PST',
    SATURDAY: '09:00 – 17:00 PST',
    SUNDAY: 'CLOSED (BY VIP APPT ONLY)',
  },
  INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/apexautomotivestudio',
  YOUTUBE_URL: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@apexautomotivestudio',
  TWITTER_URL: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://x.com/apexautomotivestudio',
  ACCENT_COLOR: '#C9A66B', // Champagne Gold
  ACCENT_COLOR_NAME: 'Champagne Gold',
  PALETTE: {
    obsidian: '#080808',
    graphite: '#121212',
    carbon: '#1A1A1A',
    titanium: '#A7A7A7',
    white: '#F5F5F5',
    accent: '#C9A66B',
  },
  HERO_MODEL: 'Apex GT Carbon Coupe',
  DEFAULT_WHATSAPP_MESSAGE: 'Hi, I\'d like to discuss a modification/detailing project for my car.',
};

export const BUILDS_DATA: BuildProject[] = [
  {
    id: 'bmw-m4-street-weapon',
    projectNumber: '01',
    vehicleName: 'BMW M4 Competition (G82)',
    year: 2023,
    subtitle: 'Street Weapon',
    category: 'Performance',
    powerHp: 650,
    torqueNm: 810,
    buildTimeDays: 28,
    modificationsCount: 22,
    heroImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
    summary: 'Full motorsport-derived aerodynamic carbon conversion, Stage 2+ forged crank hub reinforcement, and custom Akrapovič titanium exhaust with valved bypass.',
    originalCondition: 'Factory stock Dravit Grey with swirl marks from dealer delivery, standard steel brakes, restricted ECU.',
    workCompleted: [
      'Multi-stage surgical paint correction to 99.4% gloss reflection',
      'Full body Stek DynoShield Self-Healing PPF application',
      'Apex Stage 2+ Custom ECU/TCU Remap with dyno calibration',
      'Eventuri Carbon Kevlar intake system & CSF heat exchanger',
      'Bespoke Vorsteiner carbon aero package and dry-carbon rear diffuser',
    ],
    partsInstalled: [
      'PureTurbos Stage 2 Hybrid Turbos',
      'Akrapovič Titanium Evolution Line Cat-Back Exhaust',
      'BBS FI-R Forged Monoblock 20"/21" in Satin Bronze',
      'KW Suspension V4 Clubsport 3-Way Coilovers',
      'Brembo GT-R Billet Monobloc 6-Piston 405mm Brakes',
    ],
    paintFinish: 'Frozen Black Metallic with Satin Clearcoat PPF',
    performanceSpecs: {
      engine: '3.0L Twin-Turbo S58 Inline-6',
      transmission: '8-Speed M Steptronic (Clutch pressure recalibrated)',
      zeroToSixty: '2.85s',
      topSpeed: '208 mph (335 km/h)',
    },
  },
  {
    id: 'toyota-supra-midnight-spec',
    projectNumber: '02',
    vehicleName: 'Toyota GR Supra (A90)',
    year: 2022,
    subtitle: 'Midnight Spec',
    category: 'Widebody',
    powerHp: 580,
    torqueNm: 740,
    buildTimeDays: 34,
    modificationsCount: 19,
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
    summary: 'Bespoke molded widebody conversion with midnight deep metallic blue finish, custom forged staggered concave rims, and Pure800 single turbo conversion.',
    originalCondition: 'Minor rock chips on front fascia, oxidized clearcoat, stock 382 hp trim.',
    workCompleted: [
      'Artisans Spirits handcrafted carbon widebody integration with seamless fender blends',
      'Single-stage leveling + 3-layer Gyeon Certified Quartz Mohs+ ceramic coating',
      'Fuel system upgrade: Visconti port injection with Motec M142 ECU integration',
      'Custom Alcantara and perforated leather interior upholstery with gold stitching',
    ],
    partsInstalled: [
      'Pure800 Turbocharger with custom CNC billet compressor wheel',
      'Forgeline AL307 Modular 3-Piece 19x10.5 / 19x12.5 wheels',
      'HKS Super Turbo full titanium dual exhaust',
      'Recaro Podium CF Racing Buckets',
    ],
    paintFinish: 'Midnight Violet Metallic with Ceramic Glass Finish',
    performanceSpecs: {
      engine: '3.0L B58 Turbo Inline-6 (Port Injection)',
      transmission: 'ZF 8HP51 with xHP Stage 3 TCU Flash',
      zeroToSixty: '3.1s',
      topSpeed: '196 mph (315 km/h)',
    },
  },
  {
    id: 'porsche-911-gt3-oem-plus',
    projectNumber: '03',
    vehicleName: 'Porsche 911 GT3 (992)',
    year: 2024,
    subtitle: 'OEM+ Precision',
    category: 'OEM+',
    powerHp: 525,
    torqueNm: 480,
    buildTimeDays: 16,
    modificationsCount: 12,
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
    summary: 'A purist track-day machine elevated with Manthey Racing aerodynamic underbody vortex generators, JCR titanium race pipes, and ultra-high gloss self-healing protection.',
    originalCondition: 'Fresh factory delivery with minor transport contamination and micro-marring from transit wrap.',
    workCompleted: [
      'Full decontamination, acid-free iron removal, clay bar, and 2-stage gloss enhancement',
      'Edge-wrapped edge-to-edge custom templated Paint Protection Film (zero blade-on-paint)',
      'Underbody aerodynamic floor tray sealing & ceramic heat barrier application',
      'Manthey coilover height and corner balance setup on digital scales',
    ],
    partsInstalled: [
      'JCR Superlight Titanium Center Exhaust with Inconel Tips',
      'Manthey Racing Carbon Aero Rear Wing Endplates & Diffuser',
      'Surface Transforms Carbon-Silicon Carbide Brake Discs',
      'Apex Bespoke Satin Gold Magnesium Wheel Set',
    ],
    paintFinish: 'Chalk White with Gloss Carbon Fiber Accents',
    performanceSpecs: {
      engine: '4.0L Naturally Aspirated Boxer-6',
      transmission: '6-Speed GT Sports Manual with Auto-Blip',
      zeroToSixty: '3.2s',
      topSpeed: '199 mph (320 km/h)',
    },
  },
  {
    id: 'mercedes-amg-gt-executive-beast',
    projectNumber: '04',
    vehicleName: 'Mercedes-AMG GT R',
    year: 2021,
    subtitle: 'Executive Beast',
    category: 'Performance',
    powerHp: 720,
    torqueNm: 900,
    buildTimeDays: 24,
    modificationsCount: 17,
    heroImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85',
    summary: 'Black Series inspired front aero, custom turbo downpipes with 200-cell catalytic converters, full satin stealth wrap, and custom Alcantara interior detail.',
    originalCondition: 'Factory Green Hell Magno with clearcoat scuffs and stone rash on front air ducts.',
    workCompleted: [
      'Matte paint restoration and hydrophobic specialized matte sealant',
      'Tuningwerk Stage 2 ECU & downpipe installation with thermal wraps',
      'Custom suspension rake adjustment and high-speed alignment',
    ],
    partsInstalled: [
      'Weistec Engineering Downpipes & Heat Shields',
      'Brixton Forged PF7 Ultrasport+ Centerlock 20" Wheels',
      'Black Series Carbon Hood with Functional Louvers',
    ],
    paintFinish: 'Satin Magno Carbon Stealth',
    performanceSpecs: {
      engine: '4.0L Hot-V BiTurbo V8',
      transmission: '7-Speed AMG SPEEDSHIFT DCT',
      zeroToSixty: '2.9s',
      topSpeed: '205 mph (330 km/h)',
    },
  },
  {
    id: 'nissan-gtr-apex-nismo',
    projectNumber: '05',
    vehicleName: 'Nissan GT-R R35 Nismo',
    year: 2022,
    subtitle: 'Apex Godzilla',
    category: 'Performance',
    powerHp: 850,
    torqueNm: 980,
    buildTimeDays: 31,
    modificationsCount: 26,
    heroImage: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=85',
    summary: 'Alpha 9 twin-turbo conversion with billet oil pump, PPG straight-cut 1st gear, and full dry-carbon fiber underbody aero tunnels.',
    originalCondition: 'Daily driven with brake dust etched into wheel barrels and paint haze on rear quarter panels.',
    workCompleted: [
      'Full dry-ice undercarriage and engine bay restoration',
      'Surgical 3-stage compound, jeweling polish, and 9H dual-layer glass coating',
      'E85 Flex-Fuel sensor and custom triple-pump fuel system setup',
    ],
    partsInstalled: [
      'AMS Alpha 9 Turbo System',
      'Dodson Motorsport Heavy Duty Clutch Pack & Billet Baskets',
      'Volk Racing TE37 Ultra Track Edition II in Diamond Dark Gunmetal',
    ],
    paintFinish: 'Super Silver 3-Coat Metallic with Ceramic Armor',
    performanceSpecs: {
      engine: '3.8L VR38DETT V6 Twin Turbo',
      transmission: 'GR6 Dual Clutch Transaxle (Reinforced)',
      zeroToSixty: '2.4s',
      topSpeed: '215 mph (346 km/h)',
    },
  },
  {
    id: 'audi-rs6-shadow-estate',
    projectNumber: '06',
    vehicleName: 'Audi RS6 Avant (C8)',
    year: 2023,
    subtitle: 'Shadow Estate',
    category: 'Restoration',
    powerHp: 750,
    torqueNm: 1000,
    buildTimeDays: 20,
    modificationsCount: 15,
    heroImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85',
    summary: 'The ultimate stealth daily missile. Full Milltek resonated exhaust system, Eventuri carbon intake, 22" custom forged aerodiscs, and custom stealth satin armor.',
    originalCondition: 'Factory Mythos Black with severe wash marring and brake dust contamination on factory 22" alloys.',
    workCompleted: [
      'Precision paint depth mapping with Elcometer digital ultrasound gauge',
      'Cut and jewel correction removing 98% defect depth while preserving OEM clearcoat',
      'Full custom wrap in XPEL Stealth Satin Self-Healing PPF',
    ],
    partsInstalled: [
      'Eventuri Carbon Intake with High-Flow Turbo Inlets',
      'Milltek Sport Valved Stainless Exhaust with Black Oval Tips',
      'Vossen Forged S21-01 22x10.5 Custom Spec',
      'CETE Automotive Active Air Suspension Module',
    ],
    paintFinish: 'Mythos Satin Obsidian with Ceramic Shield',
    performanceSpecs: {
      engine: '4.0L Twin-Turbo Mild Hybrid V8',
      transmission: '8-Speed Tiptronic Quattro AWD',
      zeroToSixty: '3.0s',
      topSpeed: '198 mph (318 km/h)',
    },
  },
];

export const DETAILING_HOTSPOTS: DetailingHotspot[] = [
  {
    id: 'paint',
    label: 'PAINT',
    headline: 'Multi-Stage Paint Correction',
    description: 'Measured with ultrasonic depth gauges. We jewel the clearcoat down to a mirror plane, removing swirl marks, orange peel, and oxidation without depleting paint integrity.',
    position3D: [0, 0.7, 0.4],
    cameraTarget: [0.8, 0.9, 0.6],
    metrics: '99.4% Specular Gloss • <2μm Clearcoat Removal',
  },
  {
    id: 'ppf',
    label: 'PPF',
    headline: 'Precision Paint Protection Film',
    description: 'Bespoke custom-plotted 8-mil TPU self-healing film. Every body panel edge is wrapped beneath trim, badges, and seals so seams are completely invisible.',
    position3D: [0, 0.5, 1.6],
    cameraTarget: [0, 0.6, 2.2],
    metrics: '8 Mil Optical TPU • Instant Heat Self-Healing',
  },
  {
    id: 'ceramic',
    label: 'CERAMIC',
    headline: 'Long-Term Hydrophobic Protection',
    description: 'Certified 9H dual-matrix ceramic and graphene coatings chemically bind to clearcoat, creating a high-contact-angle hydrophobic shield against UV, bird strikes, and road salt.',
    position3D: [-0.7, 0.65, -0.6],
    cameraTarget: [-1.4, 0.8, -0.6],
    metrics: '112° Water Contact Angle • 5-Year Warranty',
  },
  {
    id: 'wheels',
    label: 'WHEELS',
    headline: 'Deep Wheel & Caliper Treatment',
    description: 'Wheels-off service. Barrels, spokes, hub faces, and brake calipers receive ultrasonic decontamination, rotary polish, and 1200°F high-temp ceramic coating.',
    position3D: [0.9, 0.25, 1.1],
    cameraTarget: [1.4, 0.35, 1.1],
    metrics: '1200°F Temp Resistance • Repels Hot Brake Dust',
  },
  {
    id: 'interior',
    label: 'INTERIOR',
    headline: 'Complete Interior Restoration',
    description: 'Delicate pH-neutral dry vapor steam extraction for Alcantara, Nappa leather deep conditioning with Swissvax balms, and UV ceramic barrier on carbon trim.',
    position3D: [0, 0.8, -0.1],
    cameraTarget: [0.6, 0.9, 0.1],
    metrics: 'Anti-Microbial Dry Steam • Matte OEM Finish',
  },
  {
    id: 'engine',
    label: 'ENGINE BAY',
    headline: 'Precision Engine Bay Detailing',
    description: 'Sensitive electronics shrouded. High-pressure cryo dry-ice blasting eliminates grease, grime, and oxidation without liquid moisture, followed by ceramic plastics dressing.',
    position3D: [0, 0.6, 1.2],
    cameraTarget: [0.5, 1.0, 1.4],
    metrics: 'Zero-Moisture Dry Ice • Non-Greasy Anti-Static Finish',
  },
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rahul K.',
    vehicle: 'BMW M4 Competition',
    service: 'Full Stage 2 Build & Stealth PPF',
    rating: 5,
    review: 'Had my M4 completely transformed here. The finish was insane and every detail was handled properly. The throttle mapping is surgical, and the matte PPF wrap is completely seamless.',
    thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-2',
    name: 'Marcus V.',
    vehicle: 'Porsche 911 GT3 (992)',
    service: 'Paint Correction & Ceramic Coating',
    rating: 5,
    review: 'As an obsessive car collector, I have very high standards. The reflection depth on my GT3 now rivals showroom concept cars. Ultrasonic gauge readings proved zero unnecessary clearcoat loss.',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-3',
    name: 'Evelyn S.',
    vehicle: 'Audi RS6 Avant',
    service: 'Full Bespoke Aero & Exhaust',
    rating: 5,
    review: 'From initial consultation to final delivery in the presentation hangar, the team treated my RS6 with immaculate precision. The Milltek exhaust note with valved control is pure art.',
    thumbnail: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-4',
    name: 'Darius M.',
    vehicle: 'Toyota GR Supra A90',
    service: 'Widebody & Pure800 Turbo Spec',
    rating: 5,
    review: 'Widebody fitment is notoriously difficult to get right without gaps. Apex crafted seamless body transitions and tuned 580 wheel-horsepower with zero boost lag. Absolute masters.',
    thumbnail: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=200&q=80',
  },
];

export const TRUST_STATS = [
  { id: 'stat-1', value: 500, suffix: '+', label: 'CARS BUILT', note: 'Bespoke high-performance builds' },
  { id: 'stat-2', value: 1200, suffix: '+', label: 'DETAILING JOBS', note: 'Certified multi-stage corrections' },
  { id: 'stat-3', value: 8, suffix: '+', label: 'YEARS EXPERIENCE', note: 'Engineering & restoration craft' },
  { id: 'stat-4', value: 98, suffix: '%', label: 'CUSTOMER SATISFACTION', note: 'Verified concierge client rating' },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'CONSULTATION',
    subtitle: 'Vision & Feasibility Audit',
    description: 'We sit down with your vehicle, review your performance and aesthetic goals, and define the exact scope, power targets, and bespoke timeline.',
    deliverable: 'Bespoke Build Blueprint & Component Specification Sheet',
  },
  {
    step: '02',
    title: 'INSPECTION',
    subtitle: 'Ultrasonic & Mechanical Triage',
    description: 'Every panel is scanned with digital ultrasound paint depth gauges. Engine compression, fluid health, and suspension geometry are logged into our diagnostic bench.',
    deliverable: '32-Point Pre-Build Diagnostic & Paint Depth Profile',
  },
  {
    step: '03',
    title: 'DESIGN',
    subtitle: 'Aerodynamic CAD & Visual Spec',
    description: 'Wheels, offsets, aero splitters, and wrap schemes are modeled. Custom forged wheel offsets are precision-calculated down to the millimeter for zero-rub fitment.',
    deliverable: 'Digital 3D Spec Renderings & Component Sourcing Schedule',
  },
  {
    step: '04',
    title: 'BUILD',
    subtitle: 'Precision Mechanical & Body Execution',
    description: 'Our senior technicians install hardware, route custom plumbing, torque all fasteners to aerospace specs, and calibrate engine maps on our all-wheel-drive dyno cell.',
    deliverable: 'Dyno Performance Chart & High-Res Build Progress Vault',
  },
  {
    step: '05',
    title: 'DETAIL',
    subtitle: 'Surgical Leveling & Nano-Barrier',
    description: '40+ hours of paint correction under specialized Ra95+ color-balanced lighting. Full PPF edges tucked. Dual-layer ceramic heat-cured under infrared lamps.',
    deliverable: 'Gloss Gauge Inspection Certificate & 5-Year Ceramic Warranty',
  },
  {
    step: '06',
    title: 'DELIVERY',
    subtitle: 'Dark Hangar Vehicle Reveal',
    description: 'Your machine is presented in our private delivery chamber under spotlighting, with an in-depth walkthrough of software maps, care protocols, and dyno telemetry.',
    deliverable: 'Handover Ceremony, Physical Build Book & 24/7 Concierge Support',
  },
];

export const SOCIAL_GALLERY = [
  {
    id: 'soc-1',
    title: 'Titanium TIG Welds',
    category: 'Exhaust Fabrication',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    likes: '1.4k',
  },
  {
    id: 'soc-2',
    title: '2-Stage Jeweling Polish',
    category: 'Paint Correction',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    likes: '2.8k',
  },
  {
    id: 'soc-3',
    title: 'Dry Carbon Aerodynamics',
    category: 'Aero Kit Installation',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    likes: '3.1k',
  },
  {
    id: 'soc-4',
    title: 'Brembo GT-R Monobloc Brakes',
    category: 'Chassis & Braking',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80',
    likes: '950',
  },
  {
    id: 'soc-5',
    title: 'Night Hangar Delivery',
    category: 'Client Handover',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    likes: '4.2k',
  },
  {
    id: 'soc-6',
    title: 'Alcantara Custom Stitching',
    category: 'Interior Craft',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    likes: '1.9k',
  },
];
