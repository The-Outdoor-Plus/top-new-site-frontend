"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  videos?: string[];
}

export function ProductGallery({ images, videos = [] }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const allMedia = [...images, ...videos];
  const isVideo = (index: number) => index >= images.length;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
    setIsVideoPlaying(false);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    setIsVideoPlaying(false);
  };

  const goToMedia = (index: number) => {
    setCurrentIndex(index);
    setIsVideoPlaying(false);
  };

  return (
    <div className="relative">
      {/* Main Display */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer border border-gray-300"
        onClick={() => setShowLightbox(true)}
      >
        {isVideo(currentIndex) ? (
          <div className="relative w-full h-full">
            <video
              src={allMedia[currentIndex]}
              className="object-cover w-full h-full"
              controls={isVideoPlaying}
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoPlaying(!isVideoPlaying);
              }}
            />
            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play className="w-16 h-16 text-white" />
              </div>
            )}
          </div>
        ) : (
          <Image
            src={allMedia[currentIndex]}
            alt="Product image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            priority={currentIndex === 0}
          />
        )}

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              previous();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4">
        <div className="flex gap-4 overflow-x-auto py-2 px-2 snap-x ">
          {allMedia.map((media, index) => (
            <button
              key={media}
              className={cn(
                "relative flex-none w-20 h-20 rounded-md overflow-hidden snap-start ring-1 ring-gray-300",
                currentIndex === index && "ring-2 ring-primary-color"
              )}
              onClick={() => goToMedia(index)}
            >
              {isVideo(index) ? (
                <div className="relative w-full h-full">
                  <video
                    src={media}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              ) : (
                <Image
                  src={media}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setShowLightbox(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setShowLightbox(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative w-full max-w-5xl aspect-square mx-4" onClick={(e) => e.stopPropagation()}>
              {isVideo(currentIndex) ? (
                <video
                  src={allMedia[currentIndex]}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <Image
                  src={allMedia[currentIndex]}
                  alt="Product image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              )}

              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white"
                  onClick={previous}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white"
                  onClick={next}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
            </div>

            {/* Lightbox Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex gap-2 p-2 bg-white/10 rounded-lg">
                {allMedia.map((media, index) => (
                  <button
                    key={media}
                    className={cn(
                      "relative w-16 h-16 rounded-md overflow-hidden",
                      currentIndex === index && "ring-2 ring-white"
                    )}
                    onClick={() => goToMedia(index)}
                  >
                    {isVideo(index) ? (
                      <div className="relative w-full h-full">
                        <video
                          src={media}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={media}
                        alt={`Product thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 