import { ProductType } from "@/types/products";
import { ProductView } from "@/components/products/ProductView";
import { ModernProductView } from "@/components/products/ModernProductView";

interface ProductLayoutProps {
  product: ProductType;
  layout: "modern" | "classic";
}

export function ProductLayout({ product, layout }: ProductLayoutProps) {
  if (layout === "modern") {
    return <ModernProductView product={product} />;
  }

  // Convert ProductType to the Product interface expected by ProductView
  const classicProduct = {
    id: product.id,
    name: product.name,
    partNumber: product.partNumber,
    shortDescription: product.description || "",
    msrp: product.msrp,
    discountedPrice: product.msrp * 0.9, // Example: 10% discount
    isOnSale: product.onSale,
    isQuickShip: product.isQuickShip,
    isBestSeller: product.isBestSeller,
    hasCustomOptions: product.hasCustomizableOptions,
    images: [product.image, product.secondaryImage].filter(Boolean) as string[],
    videos: [],
    specifications: [
      {
        category: "Dimensions & Weight",
        specs: product.specifications?.map(spec => ({
          name: spec.icon?.split("/").pop()?.replace(".svg", "").replace(/-/g, " ") || "Specification",
          value: spec.value
        })) || []
      }
    ],
    description: product.description || "",
    features: [
      {
        id: "construction",
        title: "Premium Construction",
        description: `Made with high-grade ${product.material}`,
        icon: "/icons/construction.svg",
        image: product.image
      }
    ],
    documents: [],
    faqs: [],
    attributes: [
      {
        id: "material",
        name: "Material",
        type: "select",
        required: true,
        values: [
          {
            id: product.material?.toLowerCase().replace(/\s+/g, "-") || "default",
            name: product.material || "Standard",
            price: 0
          }
        ],
        description: "Select your preferred material"
      }
    ],
    addons: []
  };

  return <ProductView product={classicProduct} />;
} 