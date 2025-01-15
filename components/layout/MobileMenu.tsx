'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          <div className="p-4 space-y-4">
            <div>
              <button
                onClick={() => toggleSubmenu('resources')}
                className="flex items-center justify-between w-full py-2"
              >
                <span>Resources</span>
                <ChevronDown className={cn('h-4 w-4 transition-transform', openSubmenus.resources && 'rotate-180')} />
              </button>
              <div className={cn('pl-4 space-y-2', !openSubmenus.resources && 'hidden')}>
                <Link href="/resources/1" className="block py-2">Resource 1</Link>
                <Link href="/resources/2" className="block py-2">Resource 2</Link>
              </div>
            </div>

            <Link href="/bbq-grills" className="block py-2">BBQ Grills</Link>

            <div>
              <button
                onClick={() => toggleSubmenu('media')}
                className="flex items-center justify-between w-full py-2"
              >
                <span>Media</span>
                <ChevronDown className={cn('h-4 w-4 transition-transform', openSubmenus.media && 'rotate-180')} />
              </button>
              <div className={cn('pl-4 space-y-2', !openSubmenus.media && 'hidden')}>
                <Link href="/media/news" className="block py-2">News</Link>
                <Link href="/media/blog" className="block py-2">Blog</Link>
              </div>
            </div>

            <div>
              <button
                onClick={() => toggleSubmenu('products')}
                className="flex items-center justify-between w-full py-2"
              >
                <span>Products</span>
                <ChevronDown className={cn('h-4 w-4 transition-transform', openSubmenus.products && 'rotate-180')} />
              </button>
              <div className={cn('pl-4 space-y-2', !openSubmenus.products && 'hidden')}>
                <Link href="/products/fire-features" className="block py-2">Fire Features</Link>
                <Link href="/products/water-features" className="block py-2">Water Features</Link>
                <Link href="/products/outdoor-kitchen" className="block py-2">Outdoor Kitchen</Link>
              </div>
            </div>

            <Link href="/gallery" className="block py-2">Gallery</Link>
            <Link href="/register" className="block py-2">Register Your Product</Link>
            <Link href="/contact" className="block py-2">Contact & Support</Link>
            <Link href="/custom-order" className="block py-2">Custom Order Form</Link>
          </div>
        </div>
      </div>
    </div>
  );
}