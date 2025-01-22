export interface ProductType {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  partNumber: string;
  description?: string;
  image: string;
  secondaryImage?: string;
  msrp: number;
  material?: string;
  hasCustomizableOptions: boolean;
  isQuickShip: boolean;
  isBestSeller: boolean;
  onSale: boolean;
  hasPropaneTankDoor: boolean;
  categories: string[];
  tags: string[];
  attributes: Record<string, string[]>;
  specifications?: Array<{
    icon?: string;
    value: string;
  }>;
  gallery: ProductGalleryItem[];
  highlights_primary: ProductGalleryItem[];
  highlights_secondary: ProductGalleryItem[];
}

export interface ProductGalleryItem {
  image: string;
  description?: string;
  title?: string;
}
export interface FilterState {
  onSale: boolean;
  quickShip: boolean;
  propaneFriendly: boolean;
  tags: string[];
  categories: string[];
  attributes: {
    [key: string]: string[];
  };
}
