import { ProductType } from "@/types/products";

export const products: ProductType[] = [
  {
    id: "del-mar-fire-pit",
    name: "Del Mar Fire Pit",
    slug: "del-mar-fire-pit",
    shortName: "Del Mar",
    partNumber: "OPT-DEL96FSML-LG",
    description: "The Del Mar Fire Pit is a sleek and modern fire pit perfect for any outdoor space. It features a 96-inch diameter and is made with high-grade stainless steel.",
    msrp: 2499.99,
    image: "/images/del-mar-fire-pit-1.png",
    secondaryImage: "/images/del-mar-fire-pit-0.jpg",
    material: "GFRC Concrete",
    hasCustomizableOptions: true,
    isQuickShip: true,
    isBestSeller: true,
    onSale: true,
    hasPropaneTankDoor: true,
    categories: ["Fire Pits", "Outdoor"],
    tags: ["Best Seller", "Quick Ship"],
    gallery: [
      {
        image: "/images/del-mar-fire-pit-0.jpg",
        title: "Del Mar Fire Pit",
        description: "Del Mar GFRC Gray"
      },
      {
        image: "/images/del-mar-fire-pit-1.png",
        title: "Del Mar Fire Pit",
        description: "Del Mar GFRC Chocolate"
      }
    ],
    highlights_primary: [
      {
        image: "/images/bullet_burner.jpg",
        title: "Bullet Burner",
      },
      {
        image: "/images/bullet_burner_2.jpg",
        title: "Bullet Burner",
      },
      {
        image: "/images/bullet_burner_3.jpg",
        title: "Bullet Burner",
      }
    ],
    highlights_secondary: [
      {
        image: "/images/bullet_burner.jpg",
        title: "Bullet Burner",
      }
    ],
    attributes: {
      "fuel-type": ["natural-gas", "propane"],
      "color": ["stainless-steel", "copper", "black"],
      "size": ["48-inch", "60-inch", "72-inch"],
      "ignition": ["manual", "electronic", "smart"]
    },
    specifications: [
      {
        icon: "/icons/dimensions.svg",
        value: "48\" x 48\" x 16\""
      },
      {
        icon: "/icons/weight.svg",
        value: "120 lbs"
      },
      {
        icon: "/icons/material.svg",
        value: "Stainless Steel"
      }
    ]
  }
]; 