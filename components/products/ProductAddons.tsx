"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface Addon {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  recommended?: boolean;
}

interface ProductAddonsProps {
  addons: Addon[];
  selectedAddons: string[];
  onChange: (addons: string[]) => void;
}

export function ProductAddons({
  addons = [],
  selectedAddons,
  onChange,
}: ProductAddonsProps) {
  const handleAddonToggle = (addonId: string) => {
    const newAddons = selectedAddons.includes(addonId)
      ? selectedAddons.filter((id) => id !== addonId)
      : [...selectedAddons, addonId];
    onChange(newAddons);
  };

  if (addons.length === 0) return null;

  return (
    <Card className="p-6">
      <h3 className="font-heading font-semibold mb-6">Recommended Add-ons</h3>
      <div className="space-y-4">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            {addon.image && (
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={addon.image}
                  alt={addon.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            )}
            
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={addon.id}
                  checked={selectedAddons.includes(addon.id)}
                  onCheckedChange={() => handleAddonToggle(addon.id)}
                />
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor={addon.id}
                    className="font-medium cursor-pointer hover:text-primary-color transition-colors"
                  >
                    {addon.name}
                  </Label>
                  {addon.recommended && (
                    <span className="text-xs bg-primary-color/10 text-primary-color px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Info className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{addon.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1 ml-6">
                {addon.description}
              </p>
              <p className="text-sm font-medium mt-2 ml-6">
                +${addon.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 