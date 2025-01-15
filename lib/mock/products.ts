export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  material: string;
  finish: string;
  features: string[];
}

export interface FilterOptions {
  categories: Array<{
    id: string;
    label: string;
  }>;
  features: string[];
  materials: string[];
  finishes: string[];
}

export const mockFilterOptions: FilterOptions = {
  categories: [
    { id: 'fire-pits', label: 'Fire Pits' },
    { id: 'water-features', label: 'Water Features' },
    { id: 'fire-bowls', label: 'Fire Bowls' },
    { id: 'fire-tables', label: 'Fire Tables' },
  ],
  features: [
    'Electronic Ignition',
    'Manual Ignition',
    'LED Lighting',
    'Remote Control',
    'Wind Guard',
    'All Weather Cover',
  ],
  materials: [
    'Stainless Steel',
    'Copper',
    'Bronze',
    'Aluminum',
    'Concrete',
  ],
  finishes: [
    'Brushed',
    'Polished',
    'Hammered',
    'Powder Coated',
    'Natural',
  ],
};

export const mockProducts: Product[] = [
  {
    id: 'fp-001',
    name: 'Modern Fire Pit',
    description: 'A sleek and modern fire pit perfect for any outdoor space.',
    price: 1999.99,
    category: 'fire-pits',
    image: '/images/products/fire-pit-1.jpg',
    material: 'Stainless Steel',
    finish: 'Brushed',
    features: ['Electronic Ignition', 'Remote Control', 'Wind Guard'],
  },
  {
    id: 'fp-002',
    name: 'Classic Bowl Fire Pit',
    description: 'Traditional bowl-style fire pit with modern features.',
    price: 1499.99,
    category: 'fire-pits',
    image: '/images/products/fire-pit-2.jpg',
    material: 'Copper',
    finish: 'Hammered',
    features: ['Manual Ignition', 'All Weather Cover'],
  },
  {
    id: 'wf-001',
    name: 'Contemporary Water Wall',
    description: 'Modern water feature with LED lighting.',
    price: 2499.99,
    category: 'water-features',
    image: '/images/products/water-1.jpg',
    material: 'Stainless Steel',
    finish: 'Polished',
    features: ['LED Lighting', 'Remote Control'],
  },
  {
    id: 'fb-001',
    name: 'Round Fire Bowl',
    description: 'Elegant round fire bowl for your patio.',
    price: 899.99,
    category: 'fire-bowls',
    image: '/images/products/bowl-1.jpg',
    material: 'Concrete',
    finish: 'Natural',
    features: ['Manual Ignition'],
  },
  {
    id: 'ft-001',
    name: 'Rectangular Fire Table',
    description: 'Modern fire table with ample space for entertaining.',
    price: 2999.99,
    category: 'fire-tables',
    image: '/images/products/table-1.jpg',
    material: 'Aluminum',
    finish: 'Powder Coated',
    features: ['Electronic Ignition', 'LED Lighting', 'Wind Guard'],
  },
]; 