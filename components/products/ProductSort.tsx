"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="featured" className="hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300">Featured</SelectItem>
          <SelectItem value="price-low" className="hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300">Price: Low to High</SelectItem>
          <SelectItem value="price-high" className="hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300">Price: High to Low</SelectItem>
          <SelectItem value="name-asc" className="hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300">Name: A to Z</SelectItem>
          <SelectItem value="name-desc" className="hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300">Name: Z to A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 