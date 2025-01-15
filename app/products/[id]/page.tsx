import { use } from "react";
import { ProductView } from "@/components/products/ProductView";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);

  // Mock product data - replace with actual API call
  const product = {
    id: id,
    name: "Del Mar Fire Pit",
    partNumber: "OPT-DEL96FSML-LG",
    shortDescription: "The Del Mar Fire Pit is a sleek and modern fire pit perfect for any outdoor space. It features a 96-inch diameter and is made with high-grade stainless steel.",
    msrp: 2499.99,
    discountedPrice: 2199.99,
    isOnSale: true,
    isQuickShip: true,
    isBestSeller: true,
    hasCustomOptions: true,
    images: [
      "/images/del-mar-fire-pit-0.jpg",
      "/images/del-mar-fire-pit-1.png",
    ],
    videos: [],
    specifications: [
      {
        category: "Dimensions & Weight",
        specs: [
          {
            name: "Dimensions",
            value: "48\" x 48\" x 16\"",
          },
          {
            name: "Weight",
            value: "120 lbs",
          },
        ],
      },
      {
        category: "Materials & Construction",
        specs: [
          {
            name: "Material",
            value: "Stainless Steel",
          },
          {
            name: "Construction",
            value: "Fully Welded",
          },
          {
            name: "Finish",
            value: "Brushed Stainless Steel",
          },
        ],
      },
      {
        category: "Performance",
        specs: [
          {
            name: "Fuel Type",
            value: "Natural Gas / Propane",
          },
          {
            name: "BTU Output",
            value: "65,000 BTUs",
          },
          {
            name: "Burn Time",
            value: "Unlimited (Natural Gas) / 8-12 hours (Propane)",
          },
        ],
      },
      {
        category: "Installation & Requirements",
        specs: [
          {
            name: "Installation Type",
            value: "Permanent Installation Required",
          },
          {
            name: "Gas Line",
            value: "3/4\" Gas Line Required",
          },
          {
            name: "Electrical",
            value: "110V Required for Electronic Ignition",
          },
        ],
      },
    ],
    attributes: [
      {
        id: "fuel-type",
        name: "Fuel Type",
        type: "select" as "radio" | "select" | "color",
        required: true,
        values: [
          {
            id: "natural-gas",
            name: "Natural Gas",
            description: "Requires professional installation",
          },
          {
            id: "propane",
            name: "Propane",
            price: 199.99,
            description: "Includes tank housing",
          },
        ],
        description: "Choose your preferred fuel type",
        helpText: "Natural gas requires a fixed gas line, while propane offers portability",
      },
      {
        id: "color",
        name: "Color",
        type: "radio" as "radio" | "select" | "color",
        required: true,
        values: [
          // Metallic Collection
          // {
          //   id: "stainless",
          //   name: "Stainless Steel",
          //   price: 0,
          //   image: "/images/colors/stainless.jpg",
          //   category: "Metallic Collection"
          // },
          // {
          //   id: "copper",
          //   name: "Copper",
          //   price: 299.99,
          //   image: "/images/colors/copper.jpg",
          //   category: "Metallic Collection"
          // },
          // {
          //   id: "bronze",
          //   name: "Oil Rubbed Bronze",
          //   price: 249.99,
          //   image: "/images/colors/bronze.jpg",
          //   category: "Metallic Collection"
          // },
          // {
          //   id: "brushed-nickel",
          //   name: "Brushed Nickel",
          //   price: 199.99,
          //   image: "/images/colors/brushed-nickel.jpg",
          //   category: "Metallic Collection"
          // },
          // {
          //   id: "champagne",
          //   name: "Champagne",
          //   price: 299.99,
          //   image: "/images/colors/champagne.jpg",
          //   category: "Metallic Collection"
          // },
          // // Powder Coated Collection
          // {
          //   id: "black",
          //   name: "Matte Black",
          //   price: 199.99,
          //   image: "/images/colors/black.jpg",
          //   category: "Powder Coated Collection"
          // },
          // {
          //   id: "white",
          //   name: "Pure White",
          //   price: 199.99,
          //   image: "/images/colors/white.jpg",
          //   category: "Powder Coated Collection"
          // },
          // {
          //   id: "graphite",
          //   name: "Graphite",
          //   price: 199.99,
          //   image: "/images/colors/graphite.jpg",
          //   category: "Powder Coated Collection"
          // },
          // {
          //   id: "charcoal",
          //   name: "Charcoal",
          //   price: 199.99,
          //   image: "/images/colors/charcoal.jpg",
          //   category: "Powder Coated Collection"
          // },
          // {
          //   id: "silver",
          //   name: "Silver Gray",
          //   price: 199.99,
          //   image: "/images/colors/silver.jpg",
          //   category: "Powder Coated Collection"
          // },
          // // Designer Collection
          // {
          //   id: "navy",
          //   name: "Navy Blue",
          //   price: 299.99,
          //   image: "/images/colors/navy.jpg",
          //   category: "Designer Collection"
          // },
          // {
          //   id: "forest",
          //   name: "Forest Green",
          //   price: 299.99,
          //   image: "/images/colors/forest.jpg",
          //   category: "Designer Collection"
          // },
          // {
          //   id: "burgundy",
          //   name: "Burgundy",
          //   price: 299.99,
          //   image: "/images/colors/burgundy.jpg",
          //   category: "Designer Collection"
          // },
          // {
          //   id: "bronze-metallic",
          //   name: "Bronze Metallic",
          //   price: 299.99,
          //   image: "/images/colors/bronze-metallic.jpg",
          //   category: "Designer Collection"
          // },
          // {
          //   id: "copper-vein",
          //   name: "Copper Vein",
          //   price: 299.99,
          //   image: "/images/colors/copper-vein.jpg",
          //   category: "Designer Collection"
          // },
          // // Premium Collection
          // {
          //   id: "gold",
          //   name: "Brushed Gold",
          //   price: 399.99,
          //   image: "/images/colors/gold.jpg",
          //   category: "Premium Collection"
          // },
          // {
          //   id: "rose-gold",
          //   name: "Rose Gold",
          //   price: 399.99,
          //   image: "/images/colors/rose-gold.jpg",
          //   category: "Premium Collection"
          // },
          // {
          //   id: "platinum",
          //   name: "Platinum",
          //   price: 399.99,
          //   image: "/images/colors/platinum.jpg",
          //   category: "Premium Collection"
          // },
          // {
          //   id: "gunmetal",
          //   name: "Gunmetal",
          //   price: 399.99,
          //   image: "/images/colors/gunmetal.jpg",
          //   category: "Premium Collection"
          // },
          // {
          //   id: "antique-copper",
          //   name: "Antique Copper",
          //   price: 399.99,
          //   image: "/images/colors/antique-copper.jpg",
          //   category: "Premium Collection"
          // },
          // {
          //   id: "brass",
          //   name: "Polished Brass",
          //   price: 399.99,
          //   image: "/images/colors/brass.jpg",
          //   category: "Premium Collection"
          // }
        ],
        description: "Select your preferred finish color",
        helpText: "All finishes are weather-resistant and built to last",
      },
      {
        id: "size",
        name: "Size",
        type: "select" as "radio" | "select" | "color",
        required: true,
        values: [
          {
            id: "48",
            name: "48\" Round",
            price: 0,
          },
          {
            id: "60",
            name: "60\" Round",
            price: 499.99,
            leadTime: "2-3 weeks",
          },
          {
            id: "72",
            name: "72\" Round",
            price: 999.99,
            leadTime: "3-4 weeks",
          },
        ],
        description: "Select the size that best fits your space",
      },
      {
        id: "ignition",
        name: "Ignition System",
        type: "select" as "radio" | "select" | "color",
        required: true,
        values: [
          {
            id: "manual",
            name: "Manual Match Lit",
            price: 0,
          },
          {
            id: "electronic",
            name: "Electronic Ignition",
            price: 499.99,
            description: "Includes remote control",
          },
          {
            id: "smart",
            name: "Smart Home Integration",
            price: 999.99,
            description: "Control via smartphone app",
            leadTime: "2-3 weeks",
          },
        ],
        description: "Select your preferred ignition method",
        helpText: "Electronic and Smart options require power source",
      },
    ],
    description: "Long form product description...",
    features: [
      {
        id: "weather",
        title: "All-Weather Design",
        description: "Built to withstand any weather conditions",
        icon: "/icons/weather.svg",
        image: "/images/features/weather.jpg"
      },
      {
        id: "construction",
        title: "Premium Construction",
        description: "Made with high-grade stainless steel",
        icon: "/icons/construction.svg",
        image: "/images/features/construction.jpg"
      },
      {
        id: "ignition",
        title: "Electronic Ignition",
        description: "Easy start with electronic ignition system",
        icon: "/icons/ignition.svg",
        image: "/images/features/ignition.jpg"
      }
    ],
    addons: [
      {
        id: "cover",
        name: "Protective Cover",
        description: "Heavy-duty weather resistant cover",
        price: 199.99,
        image: "/images/addons/cover.jpg",
        recommended: true
      },
      {
        id: "glass",
        name: "Fire Glass",
        description: "Premium reflective fire glass",
        price: 299.99,
        image: "/images/addons/glass.jpg",
        recommended: true
      },
      {
        id: "conversion",
        name: "Fuel Conversion Kit",
        description: "Convert between natural gas and propane",
        price: 149.99,
        image: "/images/addons/conversion.jpg"
      }
    ],
    documents: [
      {
        title: "Installation Manual",
        url: "/docs/installation.pdf",
      },
      // ... more documents
    ],
    faqs: [
      {
        question: "What type of fuel can I use?",
        answer: "This fire pit is compatible with both natural gas and propane.",
      },
      // ... more FAQs
    ],
  };

  return <ProductView product={product} />;
} 