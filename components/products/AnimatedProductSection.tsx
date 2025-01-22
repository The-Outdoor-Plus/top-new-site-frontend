"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface AnimatedProductSectionProps {
  title: string;
  description: string;
  images: {
    top: string;
    right: string;
    bottom: string;
  };
}

export function AnimatedProductSection({ title, description, images }: AnimatedProductSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 30
  });

  // Transform values for each image
  const topImageY = useTransform(smoothProgress, [0, 0.8], ["0%", "-10%"]);
  const topImageScale = useTransform(smoothProgress, [0, 0.8], [1, 0.85]);
  const rightImageY = useTransform(smoothProgress, [0.2, 0.8], ["10%", "-40%"]);
  const bottomImageY = useTransform(smoothProgress, [0.2, 1], ["0%", "-25%"]);

  return (
    <section ref={sectionRef} className="relative min-h-[150vh] w-full overflow-hidden bg-white">
      <div className="h-screen w-full">
        {/* Top Image - Full Width */}
        <motion.div 
          className="w-[90%] mx-auto rounded-lg"
          style={{ 
            y: topImageY,
            scale: topImageScale,
          }}
        >
          <div className="h-[600px]">
            <Image
              src={images.top}
              alt="Top view"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </motion.div>

        {/* Middle Section */}
        <div className="relative h-[40vh] container mx-auto">
          {/* Text Content - Left Side */}
          <div className="pr-12 w-1/2">
            <h2 className="text-[3.5rem] leading-tight font-bold mb-8">{title}</h2>
            <p className="text-xl text-gray-600">{description}</p>
          </div>

          {/* Right Image - Overlapping */}
          <motion.div 
            className="absolute right-0 top-0 w-[50%] z-10"
            style={{ y: rightImageY }}
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={images.right}
                alt="Right view"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Image */}
        <motion.div 
          className="relative max-w-[60%] h-[40vh] -mt-20 ml-24"
          style={{ y: bottomImageY }}
        >
          <Image
            src={images.bottom}
            alt="Bottom view"
            fill
            className="object-contain w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
} 