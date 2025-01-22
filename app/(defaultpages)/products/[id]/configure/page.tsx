import { ProductConfigurator } from "@/components/products/ProductConfigurator";
import { ProductType } from "@/types/products";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default async function ConfigurePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p: ProductType) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductConfigurator product={product} />;
} 