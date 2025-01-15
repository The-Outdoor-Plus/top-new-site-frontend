import HeaderSlider from '@/components/layout/HeaderSlider';
import { ProductFilter } from '@/components/HomePage/ProductFilter';
import { FeaturedGrid } from '@/components/HomePage/FeaturedGrid';
import { CatalogSection } from '@/components/HomePage/CatalogSection';
import { CategoriesSection } from '@/components/HomePage/CategoriesSection';
import { AboutSection } from '@/components/HomePage/AboutSection';
import { ContactSection } from '@/components/HomePage/ContactSection';
import BlogPostSection from '@/components/HomePage/BlogPostSection';

export default function Home() {
  return (
    <>
      <HeaderSlider />
      
      {/* Product Filter Section */}
      <section className="relative -mt-6 mb-16 z-10">
        <div className="container mx-auto px-4">
          <ProductFilter />
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="mb-16">
        <FeaturedGrid />
      </section>

      {/* Catalog Section */}
      <section className="mb-16 bg-slate-200 py-16">
        <CatalogSection />
      </section>
      {/* Modern Fire Section */}
      <section className="mx-auto py-16 bg-white ">
        <CategoriesSection />
      </section>

      <section className="container mx-auto">
        <AboutSection />
      </section>

      {/* Blog Post Section */}
      <BlogPostSection />

      <section className="container mx-auto">
        <ContactSection />
      </section>
    </>
  );
}