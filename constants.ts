import { ColorSwatch, TypographySample, HeroSlide, NavItem, Car } from './types';

// Extracted from the provided logo description and visual approximation
export const BRAND_COLORS: ColorSwatch[] = [
  {
    name: 'Empathon Navy',
    hex: '#0F1A36',
    variable: 'bg-empathon-navy',
    usage: 'Primary brand background, headers, corporate trust.'
  },
  {
    name: 'Empathon Rust',
    hex: '#C85A17',
    variable: 'bg-empathon-rust',
    usage: 'Primary actions, accents, geometric heart logo element.'
  },
  {
    name: 'Luxury Slate',
    hex: '#1E2D52',
    variable: 'bg-empathon-navyLight',
    usage: 'Secondary backgrounds, card gradients.'
  },
  {
    name: 'Rust Highlight',
    hex: '#E6722E',
    variable: 'bg-empathon-rustLight',
    usage: 'Hover states for primary actions.'
  },
  {
    name: 'Glass Surface',
    hex: 'rgba(255,255,255,0.03)',
    variable: 'bg-empathon-glass',
    usage: 'Panels, cards, overlays.'
  }
];

export const TYPOGRAPHY_SYSTEM: TypographySample[] = [
  {
    name: 'Display Serif',
    style: 'font-serif text-5xl font-bold',
    description: 'Used for major luxury headers and impact statements.'
  },
  {
    name: 'Section Heading',
    style: 'font-sans text-2xl font-semibold tracking-wide',
    description: 'Standard headers for bento grid sections.'
  },
  {
    name: 'Body Text',
    style: 'font-sans text-base text-slate-400 font-light',
    description: 'General content, descriptions, and details.'
  },
  {
    name: 'Micro Label',
    style: 'font-sans text-xs uppercase tracking-[0.2em] text-empathon-rust font-bold',
    description: 'Tags, categories, and technical specs.'
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Showroom', href: '#showroom' },
  { label: 'Corporate Fleet', href: '#corporate' },
  { label: 'Private Collection', href: '#private' },
  { label: 'Concierge', href: '#concierge' },
  { label: 'FAQ', href: '#faq' },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'GLE Authority (2020-22)',
    subtitle: 'The pinnacle of modern luxury. Experience the refined 2020-2022 Mercedes-Benz GLE 350.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'View Inventory',
    ctaSecondary: 'Reserve Now'
  },
  {
    id: 2,
    title: 'Defined by Legacy (2016-19)',
    subtitle: 'The 2016-2019 Mercedes GLE 350. A testament to enduring performance and style.',
    image: 'https://images.unsplash.com/photo-1605218427368-35b861280386?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'View Specs',
    ctaSecondary: 'Inquire'
  },
  {
    id: 3,
    title: 'The Robust ML350',
    subtitle: '2012-2015 Mercedes ML350. The classic SUV that defined a generation of corporate transport.',
    image: 'https://images.unsplash.com/photo-1553440637-d22ed8a02575?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'Check Availability',
    ctaSecondary: 'Contact'
  },
  {
    id: 4,
    title: 'Modern Efficiency',
    subtitle: '2020-2022 Toyota Corolla. Reliability meets contemporary design for the modern fleet.',
    image: 'https://images.unsplash.com/photo-1623869675781-80e6568f9aa7?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'View Corollas',
    ctaSecondary: 'Bulk Order'
  },
  {
    id: 5,
    title: 'Proven Reliability',
    subtitle: '2014-2016 Toyota Corolla. The cost-effective backbone of executive logistics.',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'View Details',
    ctaSecondary: 'Contact'
  },
  {
    id: 6,
    title: 'Sonata Executive',
    subtitle: '2015-2017 Hyundai Sonata. Spacious comfort for the discerning passenger.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'Explore Fleet',
    ctaSecondary: 'Inquire'
  },
  {
    id: 7,
    title: 'Elantra Compact',
    subtitle: '2012-2016 Hyundai Elantra. Agile, efficient, and ready for urban deployment.',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'View Stock',
    ctaSecondary: 'Contact'
  }
];

export const MOCK_CARS: Car[] = [
  {
    id: 'c1',
    brand: 'Mercedes-Benz',
    model: 'GLE 350 4MATIC',
    year: 2021,
    price: 65000000,
    mileage: 12000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    buyerType: ['Corporate', 'Individual'],
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c2',
    brand: 'Mercedes-Benz',
    model: 'GLE 350',
    year: 2018,
    price: 38000000,
    mileage: 45000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    buyerType: ['Individual'],
    image: 'https://images.unsplash.com/photo-1605218427368-35b861280386?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c3',
    brand: 'Mercedes-Benz',
    model: 'ML 350',
    year: 2014,
    price: 18500000,
    mileage: 85000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    buyerType: ['Individual', 'Corporate'],
    image: 'https://images.unsplash.com/photo-1553440637-d22ed8a02575?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c4',
    brand: 'Toyota',
    model: 'Corolla LE',
    year: 2021,
    price: 16500000,
    mileage: 15000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Pre-Order',
    buyerType: ['Individual', 'Corporate'],
    image: 'https://images.unsplash.com/photo-1623869675781-80e6568f9aa7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c5',
    brand: 'Toyota',
    model: 'Corolla S',
    year: 2015,
    price: 9500000,
    mileage: 92000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    buyerType: ['Individual'],
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c6',
    brand: 'Hyundai',
    model: 'Sonata',
    year: 2016,
    price: 8500000,
    mileage: 78000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    buyerType: ['Individual'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c7',
    brand: 'Hyundai',
    model: 'Elantra',
    year: 2014,
    price: 6500000,
    mileage: 105000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    buyerType: ['Individual'],
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=800'
  }
];