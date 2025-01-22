import { ProductType } from "@/types/products";

export interface SearchResult {
  hits: Array<{
    document: ProductType;
    highlights: Array<{
      field: string;
      snippet: string;
    }>;
  }>;
  found: number;
  page: number;
  search_time_ms: number;
}

export interface SearchParams {
  q: string;
  query_by?: string[];
  per_page?: number;
  page?: number;
  sort_by?: string;
  filter_by?: string;
}

// This will be replaced with actual Typesense implementation
export async function searchProducts(params: SearchParams): Promise<SearchResult> {
  const { q, query_by = ["name", "description", "tags", "attributes.*", "partNumber"], per_page = 10, page = 1 } = params;

  // Mock search implementation
  const searchRegex = new RegExp(q, "i");
  
  const hits = mockProducts
    .filter(product => {
      return (
        searchRegex.test(product.name) ||
        searchRegex.test(product.partNumber) ||
        product.tags.some(tag => searchRegex.test(tag)) ||
        Object.values(product.attributes).some(values => 
          values.some(value => searchRegex.test(value))
        )
      );
    })
    .slice((page - 1) * per_page, page * per_page)
    .map(product => ({
      document: product,
      highlights: [
        {
          field: "name",
          snippet: highlightText(product.name, q),
        },
      ],
    }));

  return {
    // @ts-ignore
    hits,
    found: hits.length,
    page,
    search_time_ms: 10, // Mock search time
  };
}

// Helper function to highlight matched text
function highlightText(text: string, query: string): string {
  const regex = new RegExp("(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// Mock products with more searchable content
const mockProducts = [
  {
    id: "1",
    name: "Modern Round Fire Pit",
    partNumber: "FP1001",
    description: "A sleek and modern fire pit perfect for any outdoor space",
    image: "https://example.com/fp1001.jpg",
    secondaryImage: "https://example.com/fp1001-2.jpg",
    msrp: 1999.99,
    material: "Stainless Steel",
    hasCustomizableOptions: true,
    isQuickShip: true,
    isBestSeller: true,
    onSale: false,
    categories: ["fire-pits"],
    tags: ["Modern", "Round", "Electronic Ignition"],
    attributes: {
      material: ["Stainless Steel"],
      color: ["Silver"],
      size: ["36\""],
      gasType: ["Natural Gas", "Propane"],
      ignitionType: ["Electronic"],
    },
    hasPropaneTankDoor: true,
  },
  {
    id: "2",
    name: "Copper Fire Bowl with Water Feature",
    partNumber: "FB2001",
    description: "Stunning copper fire bowl with integrated water feature",
    image: "https://example.com/fb2001.jpg",
    secondaryImage: "https://example.com/fb2001-2.jpg",
    msrp: 2499.99,
    material: "Copper",
    hasCustomizableOptions: true,
    isQuickShip: false,
    isBestSeller: true,
    onSale: true,
    categories: ["fire-bowls"],
    tags: ["Luxury", "Water Feature", "Manual Ignition"],
    attributes: {
      material: ["Copper"],
      color: ["Copper"],
      size: ["48\""],
      gasType: ["Natural Gas"],
      ignitionType: ["Manual"],
    },
    hasPropaneTankDoor: false,
  },
  // Add more mock products as needed
]; 