"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Zap, Award, Settings, Info, FileText, Play, ShoppingBag, ChevronRight } from "lucide-react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductOptions } from "@/components/products/ProductOptions";
import { ProductAddons } from "@/components/products/ProductAddons";
import { ProductSpecifications } from "@/components/products/ProductSpecifications";
import { ProductFeatures } from "@/components/products/ProductFeatures";
import { ProductFAQ } from "@/components/products/ProductFAQ";
import { ProductRelated } from "@/components/products/ProductRelated";
import { RFQForm } from "@/components/products/RFQForm";
import { ProductConfigurator } from "@/components/products/ProductConfigurator";

interface Product {
  id: string;
  name: string;
  partNumber: string;
  shortDescription: string;
  msrp: number;
  discountedPrice: number;
  isOnSale: boolean;
  isQuickShip: boolean;
  isBestSeller: boolean;
  hasCustomOptions: boolean;
  images: string[];
  videos: string[];
  specifications: Array<{
    category: string;
    specs: Array<{
      name: string;
      value: string;
    }>;
  }>;
  description: string;
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
  }>;
  documents: Array<{
    title: string;
    url: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  attributes: Array<{
    id: string;
    name: string;
    type: "select" | "radio" | "color";
    required: boolean;
    values: Array<{
      id: string;
      name: string;
      price?: number;
      inStock?: boolean;
      leadTime?: string;
      image?: string;
      category?: string;
    }>;
    description?: string;
    helpText?: string;
  }>;
  addons?: Array<{
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    recommended?: boolean;
  }>;
}

interface ProductViewProps {
  product: Product;
}

export function ProductView({ product }: ProductViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showRFQForm, setShowRFQForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Gallery */}
          <div className="space-y-6">
            <ProductGallery images={product.images} videos={product.videos} />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
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
                {product.hasCustomOptions && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Settings className="h-3 w-3" />
                    Customizable
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-heading font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">Part #{product.partNumber}</p>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold">
                  ${product.discountedPrice.toLocaleString()}
                </span>
                {product.isOnSale && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.msrp.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground">{product.shortDescription}</p>
            </div>

            {/* Product Configuration */}
            {/* <ProductConfigurator
              attributes={product.attributes}
              selectedAttributes={selectedAttributes}
              onChange={setSelectedAttributes}
            /> */}

            {/* Add-ons */}
            {product.addons && (
              <ProductAddons
                addons={product.addons}
                onChange={setSelectedAddons}
                selectedAddons={selectedAddons}
              />
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border rounded-md"
                />
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => setShowRFQForm(true)}
                >
                  Request Quote
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                asChild
              >
                <Link href="/where-to-buy">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Find a Dealer
                </Link>
              </Button>
            </div>

            {/* Quick Specs */}
            <Card className="p-6">
              <h3 className="font-heading font-semibold mb-4">Quick Specifications</h3>
              <dl className="space-y-4">
                {product.specifications.map((category) => (
                  <div key={category.category}>
                    <dt className="text-sm font-medium text-muted-foreground mb-2">
                      {category.category}
                    </dt>
                    <dd className="grid grid-cols-2 gap-x-4 gap-y-2 pl-4">
                      {category.specs.map((spec) => (
                        <div key={spec.name}>
                          <span className="text-sm text-muted-foreground">{spec.name}:</span>
                          <span className="text-sm font-medium ml-2">{spec.value}</span>
                        </div>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <div className="border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="description" className="space-y-8">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-color"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-color"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-color"
              >
                Features
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-color"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-color"
              >
                FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="prose prose-lg max-w-none">
                {product.description}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <ProductSpecifications specifications={product.specifications} />
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <ProductFeatures features={product.features} />
            </TabsContent>

            <TabsContent value="documents" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.documents.map((doc) => (
                  <Card key={doc.title} className="p-4">
                    <Link
                      href={doc.url}
                      className="flex items-center gap-4 hover:text-primary-color transition-colors"
                    >
                      <FileText className="h-8 w-8" />
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-sm text-muted-foreground">PDF Document</p>
                      </div>
                      <ChevronRight className="ml-auto h-5 w-5" />
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-8">
              <ProductFAQ faqs={product.faqs} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-heading font-bold mb-8">You May Also Like</h2>
          <ProductRelated currentProductId={product.id} />
        </div>
      </div>

      {/* Certifications and Badges */}
      <div className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center gap-12">
            <Image
              src="/badges/made-in-usa.svg"
              alt="Made in USA"
              width={100}
              height={100}
            />
            {/* Add other certification badges */}
          </div>
        </div>
      </div>

      {/* RFQ Form Modal */}
      {showRFQForm && (
        <RFQForm
          product={product}
          quantity={quantity}
          selectedAttributes={selectedAttributes}
          selectedAddons={selectedAddons}
          onClose={() => setShowRFQForm(false)}
        />
      )}
    </div>
  );
} 