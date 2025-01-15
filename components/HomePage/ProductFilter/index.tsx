'use client';

import { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ProductCategory, PRODUCT_CATEGORIES } from '@/types/product-filters';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductFilter() {
  const [filters, setFilters] = useState<Partial<ProductCategory>>({});

  const handleMainCategoryChange = (value: ProductCategory['main']) => {
    setFilters({
      main: value,
      type: undefined // Reset sub-categories when main category changes
    });
  };

  const handleTypeChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      type: value,
      style: undefined, // Reset subsequent filters
      mounting: undefined,
      material: undefined
    }));
  };

  const handleFilterChange = (key: keyof ProductCategory, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#ec7d3c] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Find Your Perfect Outdoor Feature
      </h2>
      
      <div className="space-y-6">
        {/* Main Category Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            What type of feature are you looking for?
          </label>
          <Select
            value={filters.main}
            onValueChange={handleMainCategoryChange}
          >
            <SelectTrigger className="w-full bg-white border-gray-300">
              <SelectValue placeholder="Select feature type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => (
                <SelectItem key={key} value={key} className="cursor-pointer hover:bg-gray-100">
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          {filters.main && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
            >
              {/* Product Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Select specific type
                </label>
                <Select
                  value={filters.type}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {PRODUCT_CATEGORIES[filters.main].types.map(type => (
                      <SelectItem key={type} value={type} className="cursor-pointer hover:bg-gray-100">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Filters */}
              {filters.type && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="grid gap-6 md:grid-cols-2"
                >
                  {/* Style Selection */}
                  {PRODUCT_CATEGORIES[filters.main].styles && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Style
                      </label>
                      <Select
                        value={filters.style}
                        onValueChange={(value) => handleFilterChange('style', value)}
                      >
                        <SelectTrigger className="w-full bg-white border-gray-300">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {PRODUCT_CATEGORIES[filters.main].styles.map(style => (
                            <SelectItem key={style} value={style} className="cursor-pointer hover:bg-gray-100">
                              {style}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Mounting Selection */}
                  {PRODUCT_CATEGORIES[filters.main].mounting && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Installation Type
                      </label>
                      <Select
                        value={filters.mounting}
                        onValueChange={(value) => handleFilterChange('mounting', value)}
                      >
                        <SelectTrigger className="w-full bg-white border-gray-300">
                          <SelectValue placeholder="Select mounting" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {PRODUCT_CATEGORIES[filters.main].mounting.map(mount => (
                            <SelectItem key={mount} value={mount} className="cursor-pointer hover:bg-gray-100">
                              {mount}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Material Selection */}
                  {PRODUCT_CATEGORIES[filters.main].materials && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Material
                      </label>
                      <Select
                        value={filters.material}
                        onValueChange={(value) => handleFilterChange('material', value)}
                      >
                        <SelectTrigger className="w-full bg-white border-gray-300">
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {PRODUCT_CATEGORIES[filters.main].materials.map(material => (
                            <SelectItem key={material} value={material} className="cursor-pointer hover:bg-gray-100">
                              {material}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Button */}
        {filters.main && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end mt-6 pt-6 border-t"
          >
            <button
              onClick={() => {
                // Handle search/filter application
                console.log('Applied filters:', filters);
                // Implement your search logic here
              }}
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors"
            >
              View Products
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
