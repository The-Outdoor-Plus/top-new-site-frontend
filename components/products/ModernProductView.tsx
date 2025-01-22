"use client";

import { ProductType } from "@/types/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import Image from "next/image";
import { AnimatedProductSection } from "./AnimatedProductSection";
import { useRouter } from "next/navigation";

interface ModernProductViewProps {
  product: ProductType;
}

export function ModernProductView({ product }: ModernProductViewProps) {
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const router = useRouter();

  // Quick specs to display (customize based on your product data)
  const quickSpecs = [
    {
      label: "Dimensions",
      value: product.specifications?.[0]?.value || "N/A",
    },
    {
      label: "Weight",
      value: product.specifications?.[1]?.value || "N/A",
    },
    {
      label: "Material",
      value: product.material || "N/A",
    },
  ];

  const handleBuildClick = () => {
    router.push(`/products/${product.slug}/configure`);
  };

  const images = [product.image];
  if (product.secondaryImage) {
    images.push(product.secondaryImage);
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[600px] w-full bg-gradient-to-b from-white to-gray-100">
        <div className="absolute inset-0 flex items-center justify-center top-40 max-h-[400px]">
          <Image
            id="product-image"
            src={product.image}
            alt={product.name}
            width={1200}
            height={400}
            className="object-contain opacity-0 transition-opacity duration-700"
            priority
            onLoadingComplete={() => {
              const image = document.querySelector('#product-image');
              image?.classList.add('opacity-100');
            }}
          />
        </div>
        <div className="absolute -top-10 left-1/2 animate-appear-50 transform -translate-x-1/2 text-[200px] font-bold text-gray-400/70 opacity-50 select-none duration-500 from-opacity-0 to-opacity-50">
          {product.shortName} {/* Display first word of product name */}
        </div>
      </section>

      {/* Product Info Section */}
      <section className="container mx-auto px-4 py-8 z-10">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          {product.material && <p className="text-sm -mt-4 py-1 px-2 rounded-lg bg-gray-200">{product.material}</p>}
          <div className="text-xl">
            From ${product.msrp.toLocaleString()}
            <span className="text-sm text-gray-500 ml-1">*</span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="min-w-[200px] hover:bg-gray-800 hover:text-white">
              Find a Dealer
            </Button>
            <Button 
              className="min-w-[200px] bg-black hover:!bg-gray-700 text-white"
              onClick={handleBuildClick}
            >
              Build Your {product.shortName}
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Specs Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="grid gird-cols-1">
              {quickSpecs.map((spec, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="text-4xl font-bold mb-2">{spec.value}</div>
                  <div className="text-lg text-gray-600">{spec.label}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <Image src={product.secondaryImage as string} alt={product.name} width={1200} height={400} className="object-center max-h-[500px] w-auto aspect-square" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
              <Sheet open={isSpecsOpen} onOpenChange={setIsSpecsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="min-w-[200px]">
                    Technical Specs
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] sm:w-[540px] !bg-white">
                  <SheetHeader>
                    <SheetTitle>Technical Specifications</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-8rem)] mt-8 !bg-white">
                    <div className="space-y-8 pr-6">
                      {/* Dimensions */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Dimensions & Weight</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {product.specifications?.map((spec, index) => (
                            <div key={index} className="space-y-1">
                              <div className="text-sm text-gray-500">
                                {spec.icon?.split("/").pop()?.replace(".svg", "").replace(/-/g, " ")}
                              </div>
                              <div className="font-medium">{spec.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Materials */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Materials</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">Material</div>
                            <div className="font-medium">{product.material}</div>
                          </div>
                        </div>
                      </div>
                      {/* Features */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Features</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(product.attributes).map(([key, values]) => (
                            <div key={key} className="space-y-1">
                              <div className="text-sm text-gray-500">
                                {key.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                              </div>
                              <div className="font-medium">
                                {values.map((v: string) => v.split("-").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")).join(", ")}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="w-full overflow-hidden pb-24 pt-8">
        <div className="container mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-[90%] mx-auto"
          >
            <div className="container mx-auto px-4">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Gallery</h2>
                <div className="flex justify-end gap-2 mt-4">
                  <CarouselPrevious className="relative !h-8 !w-8 rounded-none border-none bg-transparent hover:bg-transparent" />
                  <CarouselNext className="relative !h-8 !w-8 rounded-none border-none bg-transparent hover:bg-transparent" />
                </div>
              </div>
            </div>
            <CarouselContent className="-ml-4">
              {product.gallery.map((galleryitem, index) => (
                <CarouselItem key={index} className="pl-4 basis-full lg:basis-[80%] relative">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                      src={galleryitem.image}
                      alt={`${galleryitem.title}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {galleryitem.title && <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                      { galleryitem.title && <h3 className="text-3xl font-bold mb-4">{galleryitem.title}</h3>}
                      { galleryitem.description && <p className="text-lg max-w-2xl">
                        {galleryitem.description}
                      </p>}
                    </div>}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
          </Carousel>
        </div>
      </section>

      {/* Animated Product Section */}
      <AnimatedProductSection
        title="Award Winning Reliability"
        description="The Bullet Burner is a high-performance, award-winning propane gas burner that offers exceptional reliability and performance. It features a durable construction, advanced technology, and a sleek design that makes it a perfect choice for any outdoor cooking or heating needs."
        images={{
          top: product.highlights_primary[0]?.image || "",
          right: product.highlights_primary[1]?.image || "",
          bottom: product.highlights_primary[2]?.image || "",
        }}
      />
    </div>
  );
} 