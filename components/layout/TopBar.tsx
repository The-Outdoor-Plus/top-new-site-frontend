'use client';

import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-gray-100 py-2 text-xs hidden lg:block">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/catalogs" className="hover:text-primary-color">CATALOGS</Link>
          <div className="group relative">
            <span className="cursor-pointer hover:text-primary-color">RESOURCES ▾</span>
            <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-md py-2 z-50 min-w-[200px]">
              <Link href="/resources/1" className="block px-4 py-2 hover:bg-gray-100">Resource 1</Link>
              <Link href="/resources/2" className="block px-4 py-2 hover:bg-gray-100">Resource 2</Link>
            </div>
          </div>
          <Link href="/bbq-grills" className="hover:text-primary-color">BBQ GRILLS BY VIDEL USA</Link>
          <div className="group relative">
            <span className="cursor-pointer hover:text-primary-color">MEDIA ▾</span>
            <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-md py-2 z-50 min-w-[200px]">
              <Link href="/media/news" className="block px-4 py-2 hover:bg-gray-100">News</Link>
              <Link href="/media/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</Link>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="mailto:info@example.com" className="hover:text-primary-color">E-MAIL</a>
          <a href="tel:9094605579" className="hover:text-primary-color">(909)460-5579</a>
          <div className="flex space-x-2">
            <a href="https://facebook.com" className="hover:text-primary-color">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" className="hover:text-primary-color">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}