import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HeaderProvider } from '@/context/HeaderContext';
import { defaultSEO } from '@/lib/seo-config';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...defaultSEO,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/erp0inj.css"></link>
      </head>
      <body className={inter.className}>
        <HeaderProvider>
          <Header />
          <main className="pt-[64px] lg:pt-[102px]">
            {children}
          </main>
          <Footer />
        </HeaderProvider> */}
        ster />
      </body>
    </html>
  );
}