'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const catalogs = [
  {
    title: '2024 Product Catalog',
    image: '/images/catalogs/product_catalog_cover.webp',
    link: '/catalogs/2024-product'
  },
  {
    title: 'Fire Sculptures Catalog',
    image: '/images/catalogs/fire_sculptures_catalog_cover.webp',
    link: '/catalogs/fire-sculptures'
  },
  {
    title: 'Torches Catalog',
    image: '/images/catalogs/torches_catalog_cover.webp',
    link: '/catalogs/torches'
  }
];

const CatalogCard = ({ catalog }: { catalog: typeof catalogs[0] }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative flex-[0_0_280px] md:flex-[0_0_320px] mr-4 overflow-hidden rounded-2xl"
    >
      <Link href={catalog.link} className="block group">
        <div className="relative h-[460px] overflow-hidden">
          <Image
            src={catalog.image}
            alt={catalog.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-xl font-bold mb-3">{catalog.title}</h3>
            <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors">
              View Catalog
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export function CatalogSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps'
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-[1fr,2fr] gap-8 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-bold mb-4">Catalog Collection</h2>
          <p className="text-gray-600 mb-6">
            Explore our wide range of products in our latest, up to date and modern catalogs!
          </p>
          <Link 
            href="/catalogs"
            className="inline-flex items-center bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            Explore All Catalogs
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden -mx-4 px-4 py-4" ref={emblaRef}>
            <div className="flex ml-4">
              {catalogs.map((catalog, index) => (
                <CatalogCard key={index} catalog={catalog} />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg transition-opacity ${
                !canScrollPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
              }`}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg transition-opacity ${
                !canScrollNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
              }`}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
