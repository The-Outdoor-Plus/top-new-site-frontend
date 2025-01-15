import { categories } from "@/data/mock-products";
import { ProductCategoryView } from "@/components/products/ProductCategoryView";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductCategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const searchParamsData = searchParams ? await searchParams : {};
  const categoryData = categories.find(cat => cat.id === category);

  if (!categoryData) {
    notFound();
  }

  return (
    <ProductCategoryView
      categoryId={category}
      categoryName={categoryData.name}
    />
  );
} 