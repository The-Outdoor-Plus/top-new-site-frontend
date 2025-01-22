import { ProductConfigurator } from "@/components/products/ProductConfigurator";
import { ProductType } from "@/types/products";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

interface ConfigurePageProps {
  params: {
    id: string;
  };
}

export default async function ConfigurePage({ params }: ConfigurePageProps) {
  const product = products.find((p: ProductType) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductConfigurator product={product} />;
} 