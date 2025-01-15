"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductSort } from "@/components/products/ProductSort";
import { mockProducts } from "@/data/mock-products";
import { FilterState } from "@/types/products";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 30;

// Helper to convert filter state to URL params
const filterStateToSearchParams = (filters: FilterState): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.onSale) params.set("on-sale", "true");
  if (filters.quickShip) params.set("quick-ship", "true");
  if (filters.propaneFriendly) params.set("propane-friendly", "true");
  
  filters.tags.forEach(tag => {
    params.append("tag", tag.toLowerCase().replace(/\s+/g, "-"));
  });
  
  Object.entries(filters.attributes).forEach(([key, values]) => {
    values.forEach(value => {
      params.append(
        key.toLowerCase().replace(/([A-Z])/g, "-$1"),
        value.toLowerCase().replace(/\s+/g, "-")
      );
    });
  });
  
  return params;
};

// Helper to convert URL params to filter state
const searchParamsToFilterState = (searchParams: URLSearchParams, categoryId: string): FilterState => {
  return {
    onSale: searchParams.get("on-sale") === "true",
    quickShip: searchParams.get("quick-ship") === "true",
    propaneFriendly: searchParams.get("propane-friendly") === "true",
    tags: Array.from(searchParams.getAll("tag")).map(tag => 
      tag.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
    ),
    categories: [categoryId],
    attributes: Object.entries(Object.fromEntries(searchParams.entries()))
      .reduce((acc, [key, value]) => {
        if (!["on-sale", "quick-ship", "propane-friendly", "tag"].includes(key)) {
          const attributeKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
          const attributeValue = value.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
          acc[attributeKey] = [...(acc[attributeKey] || []), attributeValue];
        }
        return acc;
      }, {} as Record<string, string[]>),
  };
};

interface ProductCategoryViewProps {
  categoryId: string;
  categoryName: string;
}

export function ProductCategoryView({ categoryId, categoryName }: ProductCategoryViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state with null to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [visibleProducts, setVisibleProducts] = useState<number>(ITEMS_PER_PAGE);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>(() => 
    searchParamsToFilterState(new URLSearchParams(searchParams.toString()), categoryId)
  );

  // Set isClient to true after first render
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const newParams = filterStateToSearchParams(filters);
    const url = "/product-category/" + categoryId + (newParams.toString() ? "?" + newParams.toString() : "");
    router.push(url);
  }, [filters, categoryId, router]);

  // Memoize filtered and sorted products
  const { filteredProducts, sortedProducts, displayedProducts } = useMemo(() => {
    // Filter products
    const filtered = mockProducts.filter((product) => {
      if (!product.categories.includes(categoryId)) return false;
      if (filters.onSale && !product.onSale) return false;
      if (filters.quickShip && !product.isQuickShip) return false;
      if (filters.propaneFriendly && !product.hasPropaneTankDoor) return false;
      if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) return false;
      
      // Check attributes
      for (const [key, values] of Object.entries(filters.attributes)) {
        if (values.length > 0 && !values.some(value => product.attributes[key]?.includes(value))) {
          return false;
        }
      }
      
      return true;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
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
          const aScore = (a.isBestSeller ? 2 : 0) + (a.isQuickShip ? 1 : 0);
          const bScore = (b.isBestSeller ? 2 : 0) + (b.isQuickShip ? 1 : 0);
          return bScore - aScore;
      }
    });

    return {
      filteredProducts: filtered,
      sortedProducts: sorted,
      displayedProducts: sorted.slice(0, visibleProducts)
    };
  }, [categoryId, filters, sortBy, visibleProducts]);

  const hasMoreProducts = visibleProducts < sortedProducts.length;

  const loadMore = () => {
    setVisibleProducts(prev => prev + ITEMS_PER_PAGE);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Don't render anything until after hydration
  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            <div className="h-[600px] bg-gray-200 rounded"></div>
            <div className="grid grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[300px] bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-4xl font-heading font-bold">{categoryName}</h1>
              <p className="text-muted-foreground mt-2">
                Browse our collection of {categoryName.toLowerCase()}
              </p>
            </div>
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