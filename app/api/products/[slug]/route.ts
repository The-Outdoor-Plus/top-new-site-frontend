import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  return NextResponse.json(product);
} 