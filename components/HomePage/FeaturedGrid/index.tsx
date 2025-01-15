'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const featuredItems = [
  {
    title: 'Paradise Fall',
    subtitle: 'Explore our best selling water feature',
    image: '/images/homepage/paradise_fall_bg_2.webp',
    link: '/products/water-features',
    size: 'large'
  },
  {
    title: 'Designer Features',
    subtitle: 'Take a look to our newest collection',
    image: '/images/homepage/designer_bg_3.webp',
    link: '/products/designer-collection',
    size: 'small'
  },
  {
    title: 'Memorial Sale 10%',
    subtitle: 'Get 10% off on all torches',
    image: '/images/homepage/torches_bg_1.webp',
    link: '/products/torches',
    size: 'medium'
  }
];

const FeaturedItem = ({ item }: { item: typeof featuredItems[0] }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl ${
        item.size === 'large' ? 'col-span-2 row-span-2' : 
        item.size === 'medium' ? 'col-span-2 row-span-1' : 'col-span-2 row-span-1'
      }`}
    >
      <Link href={item.link} className="block h-full">
        <div className="relative h-full min-h-[240px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes={item.size === 'large' ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-200 mb-4">{item.subtitle}</p>
            <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export function FeaturedGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
      {featuredItems.map((item, index) => (
        <FeaturedItem key={index} item={item} />
      ))}
    </div>
  );
}
