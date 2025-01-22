"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductSort } from "@/components/products/ProductSort";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResult, searchProducts } from "@/lib/services/search";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 30;


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}

function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setSearchResults(null);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchProducts({
          q: query,
          per_page: ITEMS_PER_PAGE,
          page,
          sort_by: sortBy === "relevance" ? undefined : sortBy,
        });
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, page, sortBy]);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-heading font-bold">Search Products</h1>
        <p className="text-muted-foreground mt-4">
          Please enter a search term to find products.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-4xl font-heading font-bold">Search Results</h1>
            <p className="text-muted-foreground mt-2">
              {searchResults?.found ?? 0} results for &quot;{query}&quot;
            </p>
          </div>
          <ProductSort
            value={sortBy}
            onChange={handleSortChange}
            options={[
              { value: "relevance", label: "Best Match" },
              { value: "price-low", label: "Price: Low to High" },
              { value: "price-high", label: "Price: High to Low" },
              { value: "name-asc", label: "Name: A to Z" },
              { value: "name-desc", label: "Name: Z to A" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <SearchFilters
            searchResults={searchResults}
            onFilterChange={() => setPage(1)}
          />

          <div className="flex flex-col gap-6">
            {isLoading && page === 1 ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : searchResults?.hits.length ? (
              <>
                <ProductGrid
                  products={searchResults.hits.map(hit => hit.document)}
                />
                {searchResults.found > page * ITEMS_PER_PAGE && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={loadMore}
                      disabled={isLoading}
                      className="min-w-[200px]"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Load More Results"
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No products found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 