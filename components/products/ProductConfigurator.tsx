"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ProductType } from "@/types/products";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { ChevronsDownIcon, PrinterIcon, FlameIcon } from "lucide-react";

interface ProductConfiguratorProps {
  product: ProductType;
}

interface ConfigurationState {
  color?: string;
  [key: string]: any;
}

interface PriceBreakdown {
  baseMsrp: number;
  equipmentPrice: number;
  deliveryFee: number;
}

export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    color: "White",
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(product.msrp);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    baseMsrp: product.msrp,
    equipmentPrice: 0,
    deliveryFee: 1995, // Standard delivery fee
  });
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  const defaultOpenValues = ["exterior-colors", ...Object.keys(product.attributes)];

  const updateConfiguration = (category: string, value: string, price?: number) => {
    setConfiguration(prev => ({
      ...prev,
      [category]: value
    }));

    if (price) {
      setPriceBreakdown(prev => ({
        ...prev,
        equipmentPrice: prev.equipmentPrice + price
      }));
      setCurrentPrice(priceBreakdown.baseMsrp + priceBreakdown.equipmentPrice + price + priceBreakdown.deliveryFee);
    }

    // Find the next accordion section to scroll to
    const allCategories = ["exterior-colors", ...Object.keys(product.attributes)];
    const currentIndex = allCategories.indexOf(category);
    const nextCategory = allCategories[currentIndex + 1];

    // Only scroll if there's a next category and it's not the current one
    if (nextCategory && category !== nextCategory && accordionRefs.current[nextCategory]) {
      setTimeout(() => {
        const headerHeight = 105; // Height of the sticky header
        const extraOffset = 20; // Additional offset to show the title clearly
        const element = accordionRefs.current[nextCategory];
        
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - extraOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowFloatingBar(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header with Price */}
      <div className="bg-[#f5f5f5] z-20 border-b">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <div className="text-right">
              <p className="text-sm text-gray-600">Starting at</p>
              <p className="text-lg font-bold">${currentPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex w-full gap-8">
          {/* Left side - Gallery */}
          <div className="w-[65%]">
            <div className="sticky top-[105px] my-12">
              {/* Main Image Card */}
              <Card className="max-h-[69vh] min-h-[400px] w-full aspect-[16/9] overflow-hidden shadow-none hover:shadow-none">
                <div className="relative w-full h-full">
                  <Image
                    src={product.gallery[selectedImage].image}
                    alt={product.gallery[selectedImage].title || "Product view"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </Card>

              {/* Thumbnails Card */}
              <div className="grid grid-cols-6 gap-2 mt-4">
                {product.gallery.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-sm",
                      selectedImage === index ? "ring-2 ring-blue-500" : "ring-1 ring-gray-200"
                    )}
                  >
                    <Image
                      src={item.image}
                      alt={item.title || `View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Options */}
          <div className="w-[35%] py-12">
              <div className="">
                <div className="px-4">
                  {/* Configuration Options */}
                  <div className="">
                    <Accordion type="multiple" className="w-full space-y-4" defaultValue={defaultOpenValues}>
                      {/* Exterior Colors */}

            <Card className="bg-white shadow-none hover:shadow-none border-none px-4">
                      <AccordionItem value="exterior-colors" className="border-none rounded-lg px-1">
                        <AccordionTrigger className="text-xl hover:no-underline py-6">
                          <div className="flex justify-between w-full pr-4">
                            <span>Exterior Colors</span>
                            <span className="text-sm text-gray-600">
                              {configuration.color}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <div className="space-y-6">
                            {/* Standard Colors */}
                            <div>
                              <h3 className="font-semibold mb-4">Standard Color</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <button
                                  onClick={() => updateConfiguration("color", "White")}
                                  className={cn(
                                    "h-20 bg-white border-2 rounded-sm hover:border-gray-400 transition-colors",
                                    configuration.color === "White" ? "border-blue-500" : "border-gray-200"
                                  )}
                                />
                                <button
                                  onClick={() => updateConfiguration("color", "Black")}
                                  className={cn(
                                    "h-20 bg-black border-2 rounded-sm hover:border-gray-400 transition-colors",
                                    configuration.color === "Black" ? "border-blue-500" : "border-gray-200"
                                  )}
                                />
                              </div>
                            </div>

                            {/* Metallic Colors */}
                            <div>
                              <div className="flex justify-between mb-4">
                                <h3 className="font-semibold">Metallic Color</h3>
                                <span className="text-sm text-gray-600">$650</span>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <button
                                  onClick={() => updateConfiguration("color", "Silver Metallic", 650)}
                                  className={cn(
                                    "h-20 bg-gray-300 border-2 rounded-sm hover:border-gray-400 transition-colors",
                                    configuration.color === "Silver Metallic" ? "border-blue-500" : "border-gray-200"
                                  )}
                                />
                                <button
                                  onClick={() => updateConfiguration("color", "Graphite Metallic", 650)}
                                  className={cn(
                                    "h-20 bg-gray-700 border-2 rounded-sm hover:border-gray-400 transition-colors",
                                    configuration.color === "Graphite Metallic" ? "border-blue-500" : "border-gray-200"
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                                </Card>
                      {/* Other Configuration Options */}
                      {Object.entries(product.attributes).map(([category, values]) => (

            <Card key={category} className="bg-white shadow-none hover:shadow-none border-none px-4">
                        <AccordionItem value={category} className="border-none rounded-lg px-1">
                          <AccordionTrigger className="text-xl hover:no-underline py-6">
                            <div className="flex justify-between w-full pr-4">
                              <span>
                                {category.split("-").map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(" ")}
                              </span>
                              <span className="text-sm text-gray-600">
                                {configuration[category] || "Not Selected"}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-6">
                            <div className="grid grid-cols-1 gap-2">
                              {values.map((value: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => updateConfiguration(category, value)}
                                  className={cn(
                                    "p-4 text-left border-2 rounded-sm hover:border-gray-400 transition-colors",
                                    configuration[category] === value 
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200"
                                  )}
                                >
                                  {value.split("-").map((word: string) => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                  ).join(" ")}
                                </button>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
</Card>
                      ))}
                    </Accordion>
                  </div>
                <div className="flex justify-center mt-8">
                  <Button className="px-6 py-6 shadow-none hover:shadow-none border-black border hover:border-gray-500 hover:bg-gray-200 bg-transparent rounded">
                    <ChevronsDownIcon className="w-5 h-5 mr-2" />
                    Summary
                  </Button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="container mx-auto py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Summary</h2>
          
          <div className="space-y-12">
            {/* Build Title */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Your {product.name} Build</h3>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-black hover:bg-gray-100">
                  Specification Sheet
                </Button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4">
                <span className="text-xl">Base MSRP</span>
                <span className="text-xl">${priceBreakdown.baseMsrp.toLocaleString()}</span>
              </div>
              
              {priceBreakdown.equipmentPrice > 0 && (
                <div className="flex justify-between items-center py-4">
                  <span className="text-xl">Price for Equipment</span>
                  <span className="text-xl">${priceBreakdown.equipmentPrice.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-4">
                <span className="text-xl">Delivery, Processing and Handling Fee</span>
                <span className="text-xl">${priceBreakdown.deliveryFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-8 border-t border-gray-200">
                <span className="text-2xl font-bold">Total MSRP*</span>
                <span className="text-2xl font-bold">${currentPrice.toLocaleString()}</span>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                *All information is subject to change without notice. Neither The Outdoor Plus Company Inc. or a TOP Authorized Dealer can accept liability arising from the use of any information contained herein. Only an actual invoice issued at the time a vehicle is sold to an authorized TOP Center may be used as an official indication of equipment and pricing. The Total Manufacturers Suggested Retail Price (MSRP) shown excludes taxes, title, registration, other optional or regionally required equipment, delivery, and handling charges.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bar */}
      <div className={cn(
        "fixed bottom-0 left-8 right-8 bg-gray-600/95 text-white transition-transform duration-300 z-50 rounded-lg",
        showFloatingBar ? "translate-y-0 bottom-6" : "translate-y-full bottom-0"
      )}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
<Button variant="ghost" className="text-white hover:text-white hover:bg-[#3b3b3b]">
              Summary
            </Button>
<Button variant="ghost" className="text-white hover:text-white hover:bg-[#3b3b3b]">
                <PrinterIcon className="w-5 h-5 mr-2" />
                Print build
              </Button>
              
              <Button variant="ghost" className="text-white hover:text-white hover:bg-[#3b3b3b]">
                <FlameIcon className="w-5 h-5 mr-2" />
                Create TOP Code
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              

              <div className="border-l border-gray-600 pl-4">
                <div className="text-sm text-gray-400">Total Price</div>
                <div className="font-bold">${currentPrice.toLocaleString()}</div>
              </div>

              <Button className="bg-white text-black hover:bg-gray-200">
                Find a TOP Center
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 