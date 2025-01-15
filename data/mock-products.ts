import { ProductType } from '@/types/products';

export const categories = [
  { id: 'fire-pits', name: 'Fire Pits' },
  { id: 'fire-bowls', name: 'Fire Bowls' },
  { id: 'fire-tables', name: 'Fire Tables' },
  { id: 'water-bowls', name: 'Water Bowls' },
  { id: 'accessories', name: 'Accessories' },
];

export const attributes = {
  material: ['Hammered Copper', 'Stainless Steel', 'GFRC Concrete', 'Powder Coat'],
  color: ['Black', 'Java', 'Pewter'],
  size: ['24"', '30"', '36"', '48"'],
  gasType: ['Natural Gas', 'Liquid Propane'],
  ignitionType: ['Match Lit', 'Electronic', 'Plug & Play'],
};

export const tags = [
  'Rectangular',
  'Round',
  'Square',
  'Oval',
  'Custom',
];

export const mockProducts: ProductType[] = Array.from({ length: 100 }, (_, i) => ({
  id: `maya-fire-bowl-${i + 1}`,
  name: `Del Mar Fire Pit ${i + 1}`,
  partNumber: `OPT-DEL96-${(i + 1).toString().padStart(4, '0')}`,
  image: `/images/del-mar-fire-pit-0.jpg`,
  secondaryImage: `/images/del-mar-fire-pit-1.png`,
  msrp: Math.floor(Math.random() * 5000) + 1000,
  material: Math.random() > 0.3 ? attributes.material[Math.floor(Math.random() * attributes.material.length)] : undefined,
  hasCustomizableOptions: Math.random() > 0.5,
  isQuickShip: Math.random() > 0.7,
  isBestSeller: Math.random() > 0.8,
  onSale: Math.random() > 0.8,
  categories: [categories[Math.floor(Math.random() * categories.length)].id],
  tags: Array.from(
    { length: Math.floor(Math.random() * 3) },
    () => tags[Math.floor(Math.random() * tags.length)]
  ),
  attributes: {
    material: [attributes.material[Math.floor(attributes.material.length)]],
    color: attributes.color,
    size: [attributes.size[Math.floor(Math.random() * attributes.size.length)]],
    gasType: [attributes.gasType[Math.floor(Math.random() * attributes.gasType.length)]],
    ignitionType: [attributes.ignitionType[Math.floor(Math.random() * attributes.ignitionType.length)]],
  },
  hasPropaneTankDoor: Math.random() > 0.5,
}));
