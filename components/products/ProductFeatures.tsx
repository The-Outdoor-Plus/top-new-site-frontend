"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  video?: string;
}

interface ProductFeaturesProps {
  features: Feature[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string>(features[0]?.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
      {/* Feature Navigation */}
      <div className="space-y-2">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(feature.id)}
            className={cn(
              "w-full text-left p-4 rounded-lg transition-all",
              "hover:bg-accent",
              activeFeature === feature.id
                ? "bg-accent shadow-sm"
                : "bg-background"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src={feature.icon}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
              <span className="font-medium">{feature.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Feature Content */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {features.map(
            (feature) =>
              activeFeature === feature.id && (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Card className="h-full">
                    <div className="relative aspect-[16/9]">
                      {feature.video ? (
                        <video
                          src={feature.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      ) : (
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover rounded-t-lg"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-heading font-semibold mb-4">
                        {feature.title}
                      </h3>
                      <div className="prose prose-sm max-w-none">
                        {feature.description}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 