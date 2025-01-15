"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
  id: string;
  name: string;
  type: "select" | "radio" | "color";
  values: {
    id: string;
    name: string;
    price?: number;
    color?: string;
    image?: string;
  }[];
}

interface ProductOptionsProps {
  options: Option[];
  selectedOptions: Record<string, string>;
  onChange: (options: Record<string, string>) => void;
}

export function ProductOptions({
  options = [],
  selectedOptions,
  onChange,
}: ProductOptionsProps) {
  const [localOptions, setLocalOptions] = useState(selectedOptions);

  useEffect(() => {
    // Initialize default values only if they haven't been set
    const defaults = options.reduce((acc, option) => {
      if (!selectedOptions[option.id] && option.values.length > 0) {
        acc[option.id] = option.values[0].id;
      }
      return acc;
    }, {} as Record<string, string>);

    if (Object.keys(defaults).length > 0) {
      const newOptions = { ...selectedOptions, ...defaults };
      setLocalOptions(newOptions);
      onChange(newOptions);
    }
  }, [options]); // Only run when options change

  const handleOptionChange = (optionId: string, valueId: string) => {
    const newOptions = { ...localOptions, [optionId]: valueId };
    setLocalOptions(newOptions);
    onChange(newOptions);
  };

  if (options.length === 0) return null;

  return (
    <Card className="p-6">
      <h3 className="font-heading font-semibold mb-6">Product Options</h3>
      <div className="space-y-6">
        {options.map((option) => (
          <div key={option.id} className="space-y-3">
            <Label className="text-sm font-medium">{option.name}</Label>

            {option.type === "select" && (
              <Select
                value={localOptions[option.id]}
                onValueChange={(value) => handleOptionChange(option.id, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {option.values.map((value) => (
                    <SelectItem
                      key={value.id}
                      value={value.id}
                      className="flex items-center justify-between"
                    >
                      <span>{value.name}</span>
                      {value.price && value.price > 0 && (
                        <span className="text-muted-foreground ml-2">
                          +${value.price.toLocaleString()}
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {option.type === "radio" && (
              <RadioGroup
                value={localOptions[option.id]}
                onValueChange={(value) => handleOptionChange(option.id, value)}
                className="grid grid-cols-2 gap-4"
              >
                {option.values.map((value) => (
                  <div key={value.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={value.id} id={value.id} />
                    <Label htmlFor={value.id} className="flex items-center gap-2">
                      {value.image && (
                        <div className="relative w-8 h-8 rounded overflow-hidden">
                          <img
                            src={value.image}
                            alt={value.name}
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <span>{value.name}</span>
                        {value.price && value.price > 0 && (
                          <span className="text-muted-foreground ml-2">
                            +${value.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {option.type === "color" && (
              <RadioGroup
                value={localOptions[option.id]}
                onValueChange={(value) => handleOptionChange(option.id, value)}
                className="flex flex-wrap gap-3"
              >
                {option.values.map((value) => (
                  <div key={value.id} className="relative">
                    <RadioGroupItem
                      value={value.id}
                      id={value.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={value.id}
                      className={cn(
                        "flex flex-col items-center gap-2 cursor-pointer",
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-color peer-focus-visible:ring-offset-2"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full border-2 border-transparent",
                          "peer-checked:border-primary-color"
                        )}
                        style={{ backgroundColor: value.color }}
                      />
                      <span className="text-sm">{value.name}</span>
                      {value.price && value.price > 0 && (
                        <span className="text-sm text-muted-foreground">
                          +${value.price.toLocaleString()}
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
} 