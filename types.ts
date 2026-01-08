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

export type CarStatus = 'Available' | 'Reserved' | 'Pre-Order';
export type BuyerType = 'Corporate' | 'Individual';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: 'Automatic' | 'Manual' | 'PDK' | 'E-Drive';
  fuelType: 'Petrol' | 'Hybrid' | 'Electric' | 'Diesel';
  status: CarStatus;
  buyerType: BuyerType[];
  image: string;
}