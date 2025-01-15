'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    type: 'image',
    src: '/images/homepage/banner1.webp',
    title: '',
    subtitle: '',
    text: '',
    buttonText: '',
    buttonLink: '',
    bannerLink: '',
    overlay: false,
  },
  {
    type: 'image',
    src: '/images/homepage/banner2.webp',
    title: '',
    subtitle: '',
    text: '',
    buttonText: '',
    buttonLink: '',
    bannerLink: '',
    overlay: false,
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
    title: 'Water Features',
    subtitle: 'Create Your Perfect Oasis',
    text: 'Add tranquility to your space with our elegant water features',
    buttonText: 'Discover More',
    buttonLink: '/products/water-features',
    bannerLink: '',
    overlay: true,
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
    title: 'Water Features',
    subtitle: 'Create Your Perfect Oasis',
    text: 'Add tranquility to your space with our elegant water features',
    buttonText: 'Discover More',
    buttonLink: '/products/water-features',
    bannerLink: '',
    overlay: true,
  },
];

export default function HeaderSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 50,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 20000);
      return () => clearInterval(autoplay);
    }
  }, [emblaApi]);

  return (
    <div className="header-slider mx-auto">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div className="header-slider__slide flex-[0_0_100%]" key={index}>
              {slide.type === 'video' ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={slide.src}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src={slide.src}
                  alt={slide.title}
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-full"
                />
              )}
              <div 
                className={`absolute inset-0 flex items-center justify-center text-white ${
                  slide.overlay 
                    ? 'bg-gradient-to-t from-black/70 to-transparent' 
                    : ''
                }`}
                onClick={slide.bannerLink ? () => window.location.href = slide.bannerLink : undefined}
              >
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-block text-lg md:text-xl mb-4 opacity-90">
                      {slide.subtitle}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-8 opacity-90">
                      {slide.text}
                    </p>
                    { slide.buttonText && slide.buttonLink && (
                    <a
                      href={slide.buttonLink}
                      className="inline-block bg-primary-color hover:bg-primary-color/90 text-white px-8 py-3 rounded-full text-lg transition-colors duration-300"
                    >
                      {slide.buttonText}
                    </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-white scale-100'
                : 'bg-white/50 scale-75 hover:scale-90 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}