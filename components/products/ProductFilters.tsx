"use client";

import { FilterState } from "@/types/products";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { attributes, tags } from "@/data/mock-products";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  productCount: number;
}

export function ProductFilters({
  filters,
  onChange,
  productCount,
}: ProductFiltersProps) {
  const updateFilters = (updates: Partial<FilterState>) => {
    onChange({ ...filters, ...updates });
  };

  const toggleArrayFilter = (
    key: keyof FilterState,
    value: string,
    attributeKey?: string
  ) => {
    if (attributeKey) {
      const currentValues = filters.attributes[attributeKey] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      updateFilters({
        attributes: {
          ...filters.attributes,
          [attributeKey]: newValues,
        },
      });
    } else {
      const currentValues = filters[key] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      updateFilters({
        [key]: newValues,
      });
    }
  };

  // Get active filters count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.onSale) count++;
    if (filters.quickShip) count++;
    if (filters.propaneFriendly) count++;
    count += filters.tags.length;
    Object.values(filters.attributes).forEach(values => {
      count += values.length;
    });
    return count;
  };

  const clearAllFilters = () => {
    onChange({
      ...filters,
      onSale: false,
      quickShip: false,
      propaneFriendly: false,
      tags: [],
      attributes: {},
    });
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold">Filters</h2>
            <p className="text-sm text-muted-foreground">
              {productCount} products found
            </p>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-medium">Quick Filters</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onSale"
                  checked={filters.onSale}
                  onCheckedChange={(checked) =>
                    updateFilters({ onSale: checked as boolean })
                  }
                />
                <Label htmlFor="onSale" className="hover:cursor-pointer text-sm">On Sale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="quickShip"
                  checked={filters.quickShip}
                  onCheckedChange={(checked) =>
                    updateFilters({ quickShip: checked as boolean })
                  }
                />
                <Label htmlFor="quickShip" className="hover:cursor-pointer text-sm">Quick Ship</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="propaneFriendly"
                  checked={filters.propaneFriendly}
                  onCheckedChange={(checked) =>
                    updateFilters({ propaneFriendly: checked as boolean })
                  }
                />
                <Label htmlFor="propaneFriendly" className="hover:cursor-pointer text-sm">Propane Tank Door</Label>
              </div>
            </div>
          </div>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="tags">
              <AccordionTrigger className="transition-all hover:bg-gray-50">
                Tags
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={filters.tags.includes(tag) ? "secondary" : "outline"}
                      className="cursor-pointer transition-colors duration-200"
                      onClick={() => toggleArrayFilter("tags", tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {Object.entries(attributes).map(([key, values]) => (
              <AccordionItem value={key} key={key}>
                <AccordionTrigger className="transition-all hover:bg-gray-50 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-1">
                    {values.map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${key}-${value}`}
                          checked={filters.attributes[key]?.includes(value)}
                          onCheckedChange={() =>
                            toggleArrayFilter("attributes", value, key)
                          }
                        />
                        <Label htmlFor={`${key}-${value}`} className="hover: cursor-pointer text-sm">
                          {value}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Card>
  );
} 