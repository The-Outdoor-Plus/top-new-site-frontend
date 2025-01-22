import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  return NextResponse.json(product);
} 