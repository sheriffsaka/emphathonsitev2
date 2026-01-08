
import { ColorSwatch, TypographySample, HeroSlide, NavItem, Car } from './types';

// Extracted from the provided logo description and visual approximation
export const BRAND_COLORS: ColorSwatch[] = [
  {
    name: 'Emphathon Navy',
    hex: '#0F1A36',
    variable: 'bg-emphathon-navy',
    usage: 'Primary brand background, headers, corporate trust.'
  },
  {
    name: 'Emphathon Rust',
    hex: '#C85A17',
    variable: 'bg-emphathon-rust',
    usage: 'Primary actions, accents, geometric heart logo element.'
  },
  {
    name: 'Luxury Slate',
    hex: '#1E2D52',
    variable: 'bg-emphathon-navyLight',
    usage: 'Secondary backgrounds, card gradients.'
  },
  {
    name: 'Rust Highlight',
    hex: '#E6722E',
    variable: 'bg-emphathon-rustLight',
    usage: 'Hover states for primary actions.'
  },
  {
    name: 'Glass Surface',
    hex: 'rgba(255,255,255,0.03)',
    variable: 'bg-emphathon-glass',
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
    style: 'font-sans text-xs uppercase tracking-[0.2em] text-emphathon-rust font-bold',
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
    title: 'The Executive Phantom',
    subtitle: 'Uncompromising silence. Unparalleled presence. The definition of corporate arrival.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'Visit Showroom',
    ctaSecondary: 'Reserve Now'
  },
  {
    id: 2,
    title: 'Velocity GT Series',
    subtitle: 'Where geometric precision meets raw adrenaline. Designed for the spirited drive.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'Explore Performance',
    ctaSecondary: 'Pre-Order GT'
  },
  {
    id: 3,
    title: 'Emphathon Estate',
    subtitle: 'A sanctuary of leather and glass. Built for the modern dynasty.',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=2560',
    ctaPrimary: 'View Specs',
    ctaSecondary: 'Inquire'
  }
];

export const MOCK_CARS: Car[] = [
  {
    id: 'c1',
    brand: 'Rolls-Royce',
    model: 'Phantom Extended',
    year: 2024,
    price: 650000,
    mileage: 450,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    buyerType: ['Corporate', 'Individual'],
    image: 'https://images.unsplash.com/photo-1633513727954-c8c36293796d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c2',
    brand: 'Bentley',
    model: 'Continental GT Speed',
    year: 2024,
    price: 340000,
    mileage: 1200,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Pre-Order',
    buyerType: ['Individual'],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c3',
    brand: 'Mercedes-Maybach',
    model: 'S 680 4MATIC',
    year: 2023,
    price: 280000,
    mileage: 3400,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    status: 'Available',
    buyerType: ['Corporate'],
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c4',
    brand: 'Aston Martin',
    model: 'DBX707',
    year: 2024,
    price: 295000,
    mileage: 50,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Pre-Order',
    buyerType: ['Individual', 'Corporate'],
    image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c5',
    brand: 'Lucid',
    model: 'Air Sapphire',
    year: 2025,
    price: 249000,
    mileage: 0,
    transmission: 'E-Drive',
    fuelType: 'Electric',
    status: 'Pre-Order',
    buyerType: ['Individual'],
    image: 'https://images.unsplash.com/photo-1620882806584-c68202d68128?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c6',
    brand: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    price: 315000,
    mileage: 850,
    transmission: 'PDK',
    fuelType: 'Petrol',
    status: 'Available',
    buyerType: ['Individual'],
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa995?auto=format&fit=crop&q=80&w=800'
  }
];
