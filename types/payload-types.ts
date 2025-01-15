export interface Product {
  id: string;
  name: string;
  description: any; // Rich text content
  price: number;
  category: Category | string;
  images: {
    image: Media;
  }[];
  features: {
    feature: string;
  }[];
  specifications: {
    dimensions?: string;
    weight?: string;
    material?: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: Media;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  alt?: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: {
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
    card: {
      url: string;
      width: number;
      height: number;
    };
  };
  createdAt: string;
  updatedAt: string;
}