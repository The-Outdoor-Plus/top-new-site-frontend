import { Product, Category } from '@/types/payload-types';

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3001';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getProducts(options: {
  limit?: number;
  page?: number;
  where?: Record<string, any>;
} = {}) {
  const searchParams = new URLSearchParams();
  if (options.limit) searchParams.set('limit', options.limit.toString());
  if (options.page) searchParams.set('page', options.page.toString());
  if (options.where) searchParams.set('where', JSON.stringify(options.where));

  return fetchAPI(`/products?${searchParams.toString()}`);
}

export async function getProduct(slug: string): Promise<Product> {
  return fetchAPI(`/products?where[slug][equals]=${slug}`).then(
    (res) => res.docs[0]
  );
}

export async function getCategories(): Promise<Category[]> {
  return fetchAPI('/categories').then((res) => res.docs);
}

export async function getCategory(slug: string): Promise<Category> {
  return fetchAPI(`/categories?where[slug][equals]=${slug}`).then(
    (res) => res.docs[0]
  );
}