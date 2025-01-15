export type MenuItem = {
  title: string;
  href: string;
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export const menuData = {
  main: [
    {
      title: "Fire Pits & Tables",
      items: [
        { title: "Round Fire Pits & Tables", href: "/product-category/fire-pits" },
        { title: "Rectangular Fire Pits & Tables", href: "/product-category/fire-pits" },
        { title: "Square Fire Pits & Tables", href: "/product-category/fire-pits" },
        { title: "Commercial Fire Pits & Tables", href: "/product-category/fire-pits" },
        { title: "Metal Fire Pits & Tables", href: "/product-category/fire-pits" },
      ]
    },
    {
      title: "Bowls",
      items: [
        { title: "Fire Bowls", href: "/product-category/fire-bowls" },
        { title: "Fire & Water Bowls", href: "/product-category/fire-bowls" },
        { title: "Fire Art & Water Bowls", href: "/product-category/fire-bowls" },
        { title: "Water Bowls", href: "/product-category/fire-bowls" },
      ]
    },
    {
      title: "Self-Contained Units",
      items: [
        { title: "Complete Units", href: "/product-category/self-contained-units" },
        { title: "Blanks Only", href: "/product-category/self-contained-units" },
        { title: "View All", href: "/product-category/self-contained-units" },
      ]
    },
    {
      title: "Fire Towers & Torches",
      items: [
        { title: "View All Fire Towers", href: "/product-category/fire-towers" },
        { title: "View All Torches", href: "/product-category/torches" },
      ]
    },
    {
      title: "Scuppers",
      items: [
        { title: "Custom Water Scupper", href: "/product-category/custom-water-scupper" },
        { title: "View All Scuppers", href: "/product-category/scuppers" },
      ]
    },
    {
      title: "Tank Enclosures",
      items: [
        { title: "CFPZ Tank Enclosures", href: "/product-category/cfpz-tank-enclosures" },
        { title: "Metal Tank Enclosures", href: "/product-category/metal-tank-enclosures" },
      ]
    },
    {
      title: "Pans & Burners",
      items: [
        { title: "Drop-In Pan", href: "/product-category/drop-in-pan" },
        { title: "Uplight Pan Kits", href: "/product-category/uplight-pan-kits" },
        { title: "Bowl Lip Kits", href: "/product-category/bowl-lip-kits" },
        { title: "View All Pan & Burner Kits", href: "/product-category/pans-burners" },
      ]
    },
    {
      title: "All Products",
      items: [
        { title: "View All Products", href: "/products" }
      ]
    }
  ]
};
