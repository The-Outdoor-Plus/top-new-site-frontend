"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { SearchResult } from "@/lib/services/search";

interface SearchFiltersProps {
  searchResults: SearchResult | null;
  onFilterChange: () => void;
}

export function SearchFilters({ searchResults, onFilterChange }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract all available filters from search results
  const availableFilters = useMemo(() => {
    if (!searchResults?.hits.length) return null;

    const filters = {
      tags: new Set<string>(),
      attributes: {} as Record<string, Set<string>>,
      quickShip: false,
      onSale: false,
      propaneFriendly: false,
    };

    searchResults.hits.forEach(({ document }) => {
      // Collect tags
      document.tags.forEach(tag => filters.tags.add(tag));

      // Collect attributes
      Object.entries(document.attributes).forEach(([key, values]) => {
        if (!filters.attributes[key]) {
          filters.attributes[key] = new Set<string>();
        }
        if (values) {
          values.forEach(value => filters.attributes[key].add(value));
        }
      });

      // Check for quick filters
      if (document.isQuickShip) filters.quickShip = true;
      if (document.onSale) filters.onSale = true;
      if (document.hasPropaneTankDoor) filters.propaneFriendly = true;
    });

    return filters;
  }, [searchResults]);

  // Update URL with filters
  const updateFilters = useCallback((key: string, value: string, remove = false) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (remove) {
      const values = params.getAll(key);
      params.delete(key);
      values.filter(v => v !== value).forEach(v => params.append(key, v));
    } else {
      params.append(key, value);
    }

    const newUrl = "/search?" + params.toString();
    router.push(newUrl);
    onFilterChange();
  }, [router, searchParams, onFilterChange]);

  const isFilterActive = useCallback((key: string, value: string) => {
    return searchParams.getAll(key).includes(value);
  }, [searchParams]);

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const query = params.get("q");
    params.forEach((_, key) => {
      if (key !== "q") params.delete(key);
    });
    if (query) params.set("q", query);
    router.push("/search?" + params.toString());
    onFilterChange();
  }, [router, searchParams, onFilterChange]);

  if (!availableFilters) return null;

  const activeFilterCount = Array.from(searchParams.entries()).filter(([key]) => key !== "q").length;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold">Filters</h2>
            <p className="text-sm text-muted-foreground">
              Refine your search results
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
          {/* Quick Filters */}
          {(availableFilters.quickShip || availableFilters.onSale || availableFilters.propaneFriendly) && (
            <div className="space-y-3">
              <h3 className="font-medium">Quick Filters</h3>
              <div className="space-y-2">
                {availableFilters.onSale && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="on-sale"
                      checked={isFilterActive("on-sale", "true")}
                      onCheckedChange={(checked) =>
                        updateFilters("on-sale", "true", !checked)
                      }
                    />
                    <Label htmlFor="on-sale">On Sale</Label>
                  </div>
                )}
                {availableFilters.quickShip && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="quick-ship"
                      checked={isFilterActive("quick-ship", "true")}
                      onCheckedChange={(checked) =>
                        updateFilters("quick-ship", "true", !checked)
                      }
                    />
                    <Label htmlFor="quick-ship">Quick Ship</Label>
                  </div>
                )}
                {availableFilters.propaneFriendly && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="propane-friendly"
                      checked={isFilterActive("propane-friendly", "true")}
                      onCheckedChange={(checked) =>
                        updateFilters("propane-friendly", "true", !checked)
                      }
                    />
                    <Label htmlFor="propane-friendly">Propane Tank Door</Label>
                  </div>
                )}
              </div>
            </div>
          )}

          <Accordion type="multiple" className="w-full">
            {/* Tags */}
            {availableFilters.tags.size > 0 && (
              <AccordionItem value="tags">
                <AccordionTrigger>Tags</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {Array.from(availableFilters.tags).map((tag) => (
                      <Badge
                        key={tag}
                        variant={isFilterActive("tag", tag) ? "secondary" : "outline"}
                        className="cursor-pointer"
                        onClick={() => updateFilters("tag", tag, isFilterActive("tag", tag))}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Attributes */}
            {Object.entries(availableFilters.attributes).map(([key, values]) => (
              <AccordionItem value={key} key={key}>
                <AccordionTrigger className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-1">
                    {Array.from(values).map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${key}-${value}`}
                          checked={isFilterActive(key, value)}
                          onCheckedChange={(checked) =>
                            updateFilters(key, value, !checked)
                          }
                        />
                        <Label htmlFor={`${key}-${value}`}>{value}</Label>
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