export interface ColorSwatch {
  name: string;
  hex: string;
  variable: string;
  usage: string;
}

export interface TypographySample {
  name: string;
  style: string;
  description: string;
}

export enum ComponentVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  GLASS = 'glass'
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string; // URL or CSS Gradient for now
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface NavItem {
  label: string;
  href: string;
}