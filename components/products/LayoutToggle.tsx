"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface LayoutToggleProps {
  currentLayout: "modern" | "classic";
}

export function LayoutToggle({ currentLayout }: LayoutToggleProps) {
  const router = useRouter();

  const toggleLayout = useCallback(() => {
    const newLayout = currentLayout === "modern" ? "classic" : "modern";
    document.cookie = `product-layout=${newLayout}; path=/; max-age=31536000`; // 1 year
    router.refresh();
  }, [currentLayout, router]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLayout}
      className="fixed bottom-8 right-8 z-50 bg-white shadow-lg"
      title={`Switch to ${currentLayout === "modern" ? "classic" : "modern"} layout`}
    >
      {currentLayout === "modern" ? (
        <LayoutList className="h-4 w-4" />
      ) : (
        <LayoutGrid className="h-4 w-4" />
      )}
    </Button>
  );
} 