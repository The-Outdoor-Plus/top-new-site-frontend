"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AttributeValue {
  id: string;
  name: string;
  price?: number;
  inStock?: boolean;
  leadTime?: string;
  image?: string;
  category?: string;
}

interface Attribute {
  id: string;
  name: string;
  type: "select" | "radio" | "color";
  required: boolean;
  values: AttributeValue[];
  description?: string;
  helpText?: string;
}

interface ProductConfiguratorProps {
  attributes: Attribute[];
  selectedAttributes: Record<string, string>;
  onChange: (attributes: Record<string, string>) => void;
}

export function ProductConfigurator({
  attributes = [],
  selectedAttributes,
  onChange,
}: ProductConfiguratorProps) {
  const [localAttributes, setLocalAttributes] = useState(selectedAttributes);

  useEffect(() => {
    // Initialize default values for required attributes
    const defaults = attributes.reduce((acc, attr) => {
      if (attr.required && !selectedAttributes[attr.id] && attr.values.length > 0) {
        acc[attr.id] = attr.values[0].id;
      }
      return acc;
    }, {} as Record<string, string>);

    if (Object.keys(defaults).length > 0) {
      const newAttributes = { ...selectedAttributes, ...defaults };
      setLocalAttributes(newAttributes);
      onChange(newAttributes);
    }
  }, [attributes]);

  const handleAttributeChange = (attributeId: string, valueId: string) => {
    const newAttributes = { ...localAttributes, [attributeId]: valueId };
    setLocalAttributes(newAttributes);
    onChange(newAttributes);
  };

  const renderColorOptions = (attribute: Attribute) => {
    // Group colors by category
    const colorsByCategory = attribute.values.reduce((acc, value) => {
      const category = value.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(value);
      return acc;
    }, {} as Record<string, AttributeValue[]>);

    return (
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(colorsByCategory).map(([category, colors]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="text-sm font-medium">
              {category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2">
                <RadioGroup
                  value={localAttributes[attribute.id]}
                  onValueChange={(value) => handleAttributeChange(attribute.id, value)}
                  className="contents"
                >
                  {colors.map((value) => (
                    <div key={value.id} className="relative">
                      <RadioGroupItem
                        value={value.id}
                        id={`${attribute.id}-${value.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`${attribute.id}-${value.id}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        {value.image && (
                          <div className="relative w-full aspect-square mb-3">
                            <img
                              src={value.image}
                              alt={value.name}
                              className="object-cover rounded-md"
                            />
                          </div>
                        )}
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm font-medium text-center">{value.name}</span>
                          {value.price && value.price > 0 && (
                            <span className="text-sm text-muted-foreground">
                              +${value.price.toLocaleString()}
                            </span>
                          )}
                          {value.inStock === false && (
                            <Badge variant="secondary" className="mt-1">Out of Stock</Badge>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  if (attributes.length === 0) return null;

  return (
    <Card className="p-6">
      <h3 className="font-heading font-semibold mb-6">Configure Your Product</h3>
      <div className="space-y-6">
        {attributes.map((attribute) => (
          <div key={attribute.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">
                {attribute.name}
                {attribute.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {attribute.helpText && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{attribute.helpText}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            {attribute.description && (
              <p className="text-sm text-muted-foreground">{attribute.description}</p>
            )}

            {attribute.type === "select" && (
              <Select
                value={localAttributes[attribute.id]}
                onValueChange={(value) => handleAttributeChange(attribute.id, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {attribute.values.map((value) => (
                    <SelectItem
                      key={value.id}
                      value={value.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span>{value.name}</span>
                        {value.inStock === false && (
                          <Badge variant="secondary">Out of Stock</Badge>
                        )}
                        {value.leadTime && (
                          <Badge variant="outline">{value.leadTime}</Badge>
                        )}
                      </div>
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

            {attribute.type === "radio" && attribute.id === "color" ? (
              renderColorOptions(attribute)
            ) : attribute.type === "radio" && (
              <RadioGroup
                value={localAttributes[attribute.id]}
                onValueChange={(value) => handleAttributeChange(attribute.id, value)}
                className="grid grid-cols-2 gap-4"
              >
                {attribute.values.map((value) => (
                  <div key={value.id} className="relative">
                    <RadioGroupItem
                      value={value.id}
                      id={`${attribute.id}-${value.id}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`${attribute.id}-${value.id}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      {value.image && (
                        <img
                          src={value.image}
                          alt={value.name}
                          className="mb-3 h-20 w-20 object-contain"
                        />
                      )}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-medium">{value.name}</span>
                        {value.price && value.price > 0 && (
                          <span className="text-sm text-muted-foreground">
                            +${value.price.toLocaleString()}
                          </span>
                        )}
                      </div>
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