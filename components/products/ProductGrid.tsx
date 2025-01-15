"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/types/products";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Award, Truck, DoorOpen } from "lucide-react";

interface ProductGridProps {
  products: ProductType[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const renderColorSwatches = (colors: string[], materials?: string[]) => {
    const MAX_VISIBLE = 4;
    const swatches = colors.length > 0 ? colors : materials || [];
    const visibleSwatches = swatches.slice(0, MAX_VISIBLE);
    const remainingCount = swatches.length - MAX_VISIBLE;

    return (
      <div className="flex items-center gap-1 justify-center">
        {visibleSwatches.map((swatch, index) => (
          <div
            key={index}
            className="w-11 h-6 border border-gray-200"
            style={{
              backgroundImage: `url(/images/colorswatch/powdercoat/${swatch.toLowerCase().replace(/\s+/g, '-')}_swatch.webp)`,
            }}
          />
        ))}
        {remainingCount > 0 && (
          <span className="text-sm text-muted-foreground ml-1">
            +{remainingCount}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <Card
            className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-white rounded-none border-gray-300 hover:cursor-pointer"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="pt-6 flex flex-col h-full">
              <div className="flex flex-col flex-grow px-6">
                <h3 className="font-heading text-xl font-bold">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground text-gray-600">
                  Part #: {product.partNumber}
                </p>
                <p className="text-gray-600 mb-4">
                  Starting at: <span className="text-base font-semibold text-black">{formatPrice(product.msrp)}</span>
                </p>
              </div>
              <div 
                className="relative aspect-[16/10] mb-6 bg-white px-6"
              >
                <Image
                  src={hoveredProduct === product.id && product.secondaryImage ? product.secondaryImage : product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-6 px-6">
                  {renderColorSwatches(
                    product.attributes.color || [],
                    product.attributes.material
                  )}
                </div>

                <div className="mt-4 w-full">
                  <div className="w-full flex pl-4">
                    <div className="flex justify-center gap-4 pb-4">
                      {product.isBestSeller && (
                        <div className="flex flex-col items-center gap-2">
                          <Award className="h-6 w-6 text-gray-600" />
                          <span className="text-xs text-gray-600 text-center mt-1">Best Seller</span>
                        </div>
                      )}
                      {product.isQuickShip && (
                        <div className="flex flex-col items-center gap-2">
                          <Truck className="h-6 w-6 text-gray-600" />
                          <span className="text-xs text-gray-600 text-center mt-1">Quick Ship</span>
                        </div>
                      )}
                      {product.hasPropaneTankDoor && (
                        <div className="flex flex-col items-center gap-2">
                          <DoorOpen className="h-6 w-6 text-gray-600" />
                          <span className="text-xs text-gray-600 text-center mt-1">Propane Tank Friendly</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-10 py-6 ml-auto mt-auto">
                      VIEW
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
} 