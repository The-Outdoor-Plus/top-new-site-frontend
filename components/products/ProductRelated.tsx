"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Award } from "lucide-react";

interface ProductRelatedProps {
  currentProductId: string;
}

export function ProductRelated({ currentProductId }: ProductRelatedProps) {
  // Mock related products - replace with actual API call
  const relatedProducts = [
    {
      id: "fp-42",
      name: "42\" Fire Pit",
      image: "/images/product-1.jpg",
      price: 1999.99,
      isQuickShip: true,
      isBestSeller: false,
    },
    {
      id: "fp-60",
      name: "60\" Fire Pit",
      image: "/images/product-2.jpg",
      price: 2999.99,
      isQuickShip: false,
      isBestSeller: true,
    },
    {
      id: "fp-36",
      name: "36\" Fire Pit",
      image: "/images/product-3.jpg",
      price: 1499.99,
      isQuickShip: true,
      isBestSeller: false,
    },
  ].filter(product => product.id !== currentProductId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedProducts.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isQuickShip && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Quick Ship
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Best Seller
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-medium mb-2">{product.name}</h3>
              <p className="text-lg font-medium">
                ${product.price.toLocaleString()}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
} 