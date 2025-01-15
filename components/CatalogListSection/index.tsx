"use client";

import { useState } from "react";
import Modal from "@/components/ui/IFrameModal";

const catalogs = [
  {
    id: 1,
    title: "Fire Pits Catalog",
    image: "/images/catalogs/product_catalog_cover.webp", // Replace with your image path
    embedUrl: "//e.issuu.com/embed.html?backgroundColor=%23ebb88a&backgroundColorFullscreen=%23ebb88a&d=orange_juice_issue_1_b0ceb817d77d59&hideIssuuLogo=false&hideShareButton=true&pageNumber=1&u=ds_demo", // Replace with your Issuu embed URL
  },
  {
    id: 2,
    title: "Bowls Catalog",
    image: "/images/catalogs/bowls_catalog_cover.webp", // Replace with your image path
    embedUrl: "//e.issuu.com/embed.html?backgroundColor=%23ebb88a&backgroundColorFullscreen=%23ebb88a&d=orange_juice_issue_1_b0ceb817d77d59&hideIssuuLogo=false&hideShareButton=true&pageNumber=1&u=ds_demo", // Replace with your Issuu embed URL
  },
  {
    id: 3,
    title: "Designer Series Catalog",
    image: "/images/catalogs/designer_catalog_cover.webp", // Replace with your image path
    embedUrl: "//e.issuu.com/embed.html?backgroundColor=%23ebb88a&backgroundColorFullscreen=%23ebb88a&d=orange_juice_issue_1_b0ceb817d77d59&hideIssuuLogo=false&hideShareButton=true&pageNumber=1&u=ds_demo", // Replace with your Issuu embed URL
  },
  {
    id: 4,
    title: "Fire Sculptures Catalog",
    image: "/images/catalogs/fire_sculptures_catalog_cover.webp", // Replace with your image path
    embedUrl: "//e.issuu.com/embed.html?backgroundColor=%23ebb88a&backgroundColorFullscreen=%23ebb88a&d=orange_juice_issue_1_b0ceb817d77d59&hideIssuuLogo=false&hideShareButton=true&pageNumber=1&u=ds_demo", // Replace with your Issuu embed URL
  },
  {
    id: 5,
    title: "Grills Catalog",
    image: "/images/catalogs/grills_catalog_cover.webp", // Replace with your image path
    embedUrl: "//e.issuu.com/embed.html?backgroundColor=%23ebb88a&backgroundColorFullscreen=%23ebb88a&d=orange_juice_issue_1_b0ceb817d77d59&hideIssuuLogo=false&hideShareButton=true&pageNumber=1&u=ds_demo", // Replace with your Issuu embed URL
  },
  {
    id: 6,
    title: "Torches Catalog",
    image: "/images/catalogs/torches_catalog_cover.webp", // Replace with your image path
    embedUrl: "//e.issuu.com/embed.html?backgroundColor=%23ebb88a&backgroundColorFullscreen=%23ebb88a&d=orange_juice_issue_1_b0ceb817d77d59&hideIssuuLogo=false&hideShareButton=true&pageNumber=1&u=ds_demo", // Replace with your Issuu embed URL
  },
  {
    id: 7,
    title: "RTF Catalog",
    image: "/images/catalogs/rtf_catalog_cover.webp", // Replace with your image path
    embedUrl: "//e.issuu.com/embed.html?backgroundColor=%23ebb88a&backgroundColorFullscreen=%23ebb88a&d=orange_juice_issue_1_b0ceb817d77d59&hideIssuuLogo=false&hideShareButton=true&pageNumber=1&u=ds_demo", // Replace with your Issuu embed URL
  },
];

export const CatalogListSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState<any>(null);

  const openModal = (catalog: any) => {
    setSelectedCatalog(catalog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCatalog(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="lg:text-4xl xl:text-5xl font-bold text-center mb-8">Our Catalogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {catalogs.map((catalog) => (
            <div key={catalog.id} className="relative group cursor-pointer h-96" onClick={() => openModal(catalog)}>
              <img
                src={catalog.image}
                alt={catalog.title}
                className="w-full h-96 object-cover object-top rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center rounded-lg justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105">
                <h3 className="text-white text-xl font-semibold text-center">{catalog.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-end rounded-lg justify-center opacity-100 group-hover:opacity-0 bg-gradient-to-b from-transparent from-70% to-100% to-black transition-opacity duration-500">
                <h3 className="text-white text-xl font-semibold mb-4 text-center">{catalog.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for displaying the catalog */}
      {selectedCatalog && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedCatalog.title}
          embedUrl={selectedCatalog.embedUrl}
        />
      )}
    </section>
  );
};
