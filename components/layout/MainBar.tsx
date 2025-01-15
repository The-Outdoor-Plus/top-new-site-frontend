'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useHeader } from '@/context/HeaderContext';
import { menuData } from '@/data/menuData';
import Link from 'next/link';
import { Search, Menu, ShoppingCart, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import { SearchResult, searchProducts } from '@/lib/services/search';
import { Card } from "@/components/ui/card";

interface MainBarProps {
  onMenuClick: () => void;
}

export default function MainBar({ onMenuClick }: MainBarProps) {
  const { setDropdownOpen } = useHeader();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery) {
        setResults(null);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchProducts({
          q: debouncedQuery,
          per_page: 5,
        });
        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="py-2 border-b text-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/top_logo_ob.webp"
              alt="The Outdoor Plus"
              width={125}
              height={48}
              className="h-[48px] w-auto"
            />
          </Link>
          <div className="hidden lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onMouseOver={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="text-black hover:text-primary-color text-base font-normal"
                  >
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent 
                    onMouseOver={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="bg-white border border-white/20 shadow-lg data-[motion=to-start]:duration-0 data-[motion=to-end]:duration-0"
                  >
                    <div className="flex w-[1200px]">
                      <div className="flex-1 p-8">
                        <div className="grid grid-cols-3 gap-x-12 gap-y-8">
                          {menuData.main.map((section) => (
                            <div key={`section-${section.title}`} className="space-y-3">
                              <h3 className="font-medium text-gray-900 mb-2 text-sm uppercase tracking-wide">
                                {section.title}
                              </h3>
                              <ul className="space-y-2">
                                {section.items.map((item) => (
                                  <li key={`${section.title}-${item.title}-${item.href}`}>
                                    <Link
                                      href={item.href}
                                      className="text-blue-600 hover:text-blue-800 text-sm block py-0.5"
                                    >
                                      {item.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="w-[300px] bg-gray-100 p-4">
                        <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                          <Image
                            src="/images/designer-series.jpg"
                            alt="Designer Series"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-medium text-lg mb-2">Designer Series</h3>
                            <Link 
                              href="/designer-series"
                              className="text-white text-sm hover:underline"
                            >
                              Explore Now →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden lg:flex items-center space-x-6">
            <div className="group relative">
              <Link href="/contact" className="hover:text-primary-color">Contact & Support ▾</Link>
              <div className="hidden group-hover:block absolute top-full right-0 bg-white shadow-md py-2 z-50 min-w-[200px]">
                <Link href="/contact/sales" className="block px-4 py-2 hover:bg-gray-100">Sales Support</Link>
                <Link href="/contact/technical" className="block px-4 py-2 hover:bg-gray-100">Technical Support</Link>
              </div>
            </div>
            <Link href="/custom-order" className="hidden xl:block hover:text-primary-color">Custom Order Form</Link>
            <div ref={searchContainerRef} className="relative">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setIsOpen(true);
                    }}
                    className="pl-10 pr-8 py-2 border rounded-full w-[300px] focus:outline-none focus:border-primary-color"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </form>

              {isOpen && (query || isLoading) && (
                <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-[80vh] overflow-auto shadow-lg bg-white">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                  ) : results?.hits.length ? (
                    <div className="p-2 divide-y">
                      {results.hits.map(({ document: product }) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="flex items-center gap-4 p-2 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="relative h-16 w-16 flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3 className="font-medium line-clamp-1">{product.name}</h3>
                            <p className="text-sm text-gray-500">
                              SKU: {product.partNumber}
                            </p>
                          </div>
                        </Link>
                      ))}
                      
                      {results.found > 5 && (
                        <button
                          onClick={() => {
                            router.push(`/search?q=${encodeURIComponent(query)}`);
                            setIsOpen(false);
                          }}
                          className="w-full p-2 text-sm text-primary-color hover:bg-gray-50 transition-colors"
                        >
                          View all {results.found} results
                        </button>
                      )}
                    </div>
                  ) : query ? (
                    <div className="p-4 text-center text-gray-500">
                      No products found matching &ldquo;{query}&rdquo;
                    </div>
                  ) : null}
                </Card>
              )}
            </div>
          </div>
          
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-primary-color text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
              0
            </span>
          </Link>
          
          <button onClick={onMenuClick} className="lg:hidden p-2">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}