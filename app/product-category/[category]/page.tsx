import { categories } from "@/data/mock-products";
import { ProductCategoryView } from "@/components/products/ProductCategoryView";
import { notFound } from "next/navigation";

interface ProductCategoryPageProps {
  params: {
    category: string;
  };
}

export default function ProductCategoryPage({ params }: ProductCategoryPageProps) {
  const categoryData = categories.find(cat => cat.id === params.category);

  if (!categoryData) {
    notFound();
  }

  return (
    <ProductCategoryView
      categoryId={params.category}
      categoryName={categoryData.name}
    />
  );
} 