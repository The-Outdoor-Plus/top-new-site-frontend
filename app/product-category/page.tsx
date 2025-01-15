import { categories } from "@/data/mock-products";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function ProductCategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold mb-8">Product Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link href={`/product-category/${category.id}`} key={category.id}>
            <Card className="group h-full hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-heading font-semibold mb-2">
                  {category.name}
                </h2>
                <p className="text-muted-foreground">
                  Browse our collection of {category.name.toLowerCase()}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 