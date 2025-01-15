export type ProductCategory = {
  main: 'fire' | 'water' | 'combo';
  type: string;    // Fire Pit, Fire Bowl, Waterfall, etc.
  style?: string;  // Modern, Traditional, etc.
  mounting?: string; // Built-in, Freestanding
  material?: string; // Copper, Stainless Steel, etc.
  ignition?: string; // Match-lit, Electronic, etc.
  size?: string;    // Small, Medium, Large
}

export const PRODUCT_CATEGORIES = {
  fire: {
    label: 'Fire Features',
    types: [
      'Fire Pit',
      'Fire Bowl',
      'Fire & Water Bowl',
      'Fire Torch',
      'Fire Sculpture'
    ],
    styles: ['Modern', 'Traditional', 'Contemporary'],
    mounting: ['Built-in', 'Freestanding'],
    ignition: ['Match-lit', 'Electronic', 'Smart Control'],
    materials: ['Copper', 'Stainless Steel', 'Concrete', 'Custom']
  },
  water: {
    label: 'Water Features',
    types: [
      'Water Bowl',
      'Waterfall',
      'Pool Scupper',
      'Water Wall'
    ],
    styles: ['Modern', 'Classic', 'Natural'],
    mounting: ['Wall-mounted', 'Freestanding', 'Pool-integrated'],
    materials: ['Copper', 'Stainless Steel', 'Natural Stone']
  },
  combo: {
    label: 'Fire & Water Features',
    types: [
      'Fire & Water Bowl',
      'Fire & Water Wall',
      'Custom Combinations'
    ],
    styles: ['Modern', 'Contemporary', 'Custom'],
    mounting: ['Built-in', 'Freestanding'],
    materials: ['Copper', 'Stainless Steel', 'Custom']
  }
} as const;
