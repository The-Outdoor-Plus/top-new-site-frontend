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
import Image from 'next/image';
import Link from 'next/link';

export default function NavigationBar() {
  const { setDropdownOpen } = useHeader();

  return (
    <nav className="bg-black text-white py-2 hidden lg:block">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList className="space-x-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                onMouseOver={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                className="text-white hover:text-primary-color text-base font-light"
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
                        <div key={section.title} className="space-y-3">
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

            <NavigationMenuItem>
              <Link href="/catalog-2024" legacyBehavior passHref>
                <NavigationMenuLink className="bg-[#fcb017] px-6 py-1.5 rounded-full text-black font-medium text-sm uppercase tracking-wide hover:bg-[#FCB017]/90">
                  Explore 2025 Catalogs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-8">
              <NavigationMenuItem>
                <Link href="/gallery" legacyBehavior passHref>
                  <NavigationMenuLink className="text-white hover:text-primary-color text-sm font-light">
                    Gallery
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/register" legacyBehavior passHref>
                  <NavigationMenuLink className="text-white hover:text-primary-color text-sm font-light">
                    Register Your Product
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}