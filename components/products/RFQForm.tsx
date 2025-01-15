"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  partNumber: string;
  attributes: Array<{
    id: string;
    name: string;
    type: "select" | "radio" | "color";
    values: Array<{
      id: string;
      name: string;
      price?: number;
    }>;
  }>;
  addons?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

interface RFQFormProps {
  product: Product;
  quantity: number;
  selectedAttributes: Record<string, string>;
  selectedAddons: string[];
  onClose: () => void;
}

export function RFQForm({
  product,
  quantity,
  selectedAttributes,
  selectedAddons,
  onClose,
}: RFQFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const getSelectedAttributeNames = () => {
    return Object.entries(selectedAttributes).map(([attrId, valueId]) => {
      const attribute = product.attributes.find(attr => attr.id === attrId);
      if (!attribute) return null;
      
      const value = attribute.values.find(val => val.id === valueId);
      if (!value) return null;

      return {
        name: attribute.name,
        value: value.name,
        price: value.price
      };
    }).filter(Boolean);
  };

  const getSelectedAddonNames = () => {
    return (product.addons || [])
      .filter(addon => selectedAddons.includes(addon.id))
      .map(addon => ({
        name: addon.name,
        price: addon.price
      }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      productId: product.id,
      productName: product.name,
      partNumber: product.partNumber,
      quantity,
      selectedAttributes: getSelectedAttributeNames(),
      selectedAddons: getSelectedAddonNames(),
      customerInfo: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        message: formData.get("message"),
      },
    };

    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you within 24 hours.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAttributeDetails = getSelectedAttributeNames();
  const selectedAddonDetails = getSelectedAddonNames();

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and our team will get back to you with pricing
            and availability.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Product Summary */}
          <div className="p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">{product.name}</h4>
            <p className="text-sm text-muted-foreground">Part #{product.partNumber}</p>
            <div className="text-sm text-muted-foreground space-y-1 mt-2">
              <p>Quantity: {quantity}</p>
              {selectedAttributeDetails.length > 0 && (
                <div>
                  <p className="font-medium text-foreground">Selected Options:</p>
                  <ul className="list-disc list-inside">
                    {selectedAttributeDetails.map((attr, index) => attr && (
                      <li key={index} className="flex items-baseline justify-between">
                        <span>{attr.name}: {attr.value}</span>
                        {attr.price && attr.price > 0 && (
                          <span className="text-muted-foreground ml-2">
                            +${attr.price.toLocaleString()}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedAddonDetails.length > 0 && (
                <div>
                  <p className="font-medium text-foreground">Add-ons:</p>
                  <ul className="list-disc list-inside">
                    {selectedAddonDetails.map((addon, index) => (
                      <li key={index} className="flex items-baseline justify-between">
                        <span>{addon.name}</span>
                        <span className="text-muted-foreground ml-2">
                          +${addon.price.toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="Your company name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Any specific requirements or questions?"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 