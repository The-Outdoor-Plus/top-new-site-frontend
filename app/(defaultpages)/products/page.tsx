"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductSort } from "@/components/products/ProductSort";
import { mockProducts } from "@/data/mock-products";
import { FilterState, ProductType } from "@/types/products";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 30;

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    onSale: false,
    quickShip: false,
    propaneFriendly: false,
    tags: [],
    categories: [],
    attributes: {},
  });
  
  const [sortBy, setSortBy] = useState<string>("featured");
  const [visibleProducts, setVisibleProducts] = useState<number>(ITEMS_PER_PAGE);
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and sorting
  const filteredProducts = mockProducts.filter((product) => {
    if (filters.onSale && !product.onSale) return false;
    if (filters.quickShip && !product.isQuickShip) return false;
    if (filters.propaneFriendly && !product.hasPropaneTankDoor) return false;
    if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) return false;
    if (filters.categories.length > 0 && !filters.categories.some(cat => product.categories.includes(cat))) return false;
    
    // Check attributes
    for (const [key, values] of Object.entries(filters.attributes)) {
      // @ts-ignore
      if (values.length > 0 && !values.some(value => product.attributes[key]?.includes(value))) {
        return false;
      }
    }
    
    return true;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.msrp - b.msrp;
      case "price-high":
        return b.msrp - a.msrp;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        // For "featured", prioritize best sellers and quick ship items
        const aScore = (a.isBestSeller ? 2 : 0) + (a.isQuickShip ? 1 : 0);
        const bScore = (b.isBestSeller ? 2 : 0) + (b.isQuickShip ? 1 : 0);
        return bScore - aScore;
    }
  });

  const displayedProducts = sortedProducts.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < sortedProducts.length;

  const loadMore = () => {
    setVisibleProducts(prev => prev + ITEMS_PER_PAGE);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-heading font-bold">Products</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilters}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-black"
            >
              {showFilters ? (
                <>
                  <X className="h-4 w-4" />
                  Hide Filters
                </>
              ) : (
                <>
                  <SlidersHorizontal className="h-4 w-4" />
                  Show Filters
                </>
              )}
            </Button>
          </div>
          <ProductSort value={sortBy} onChange={setSortBy} />
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ProductFilters
                  filters={filters}
                  onChange={setFilters}
                  productCount={filteredProducts.length}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-6">
            <ProductGrid products={displayedProducts} />
            
            {hasMoreProducts && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={loadMore}
                  className="min-w-[200px]"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 