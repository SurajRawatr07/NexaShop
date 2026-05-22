import React from "react";
import SectionHeader from "./SectionHeader";

const BRANDS = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
];

export default function BrandsSection() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <SectionHeader title="Top Brands" subtitle="Shop from the world's best brands" />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="glass rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-500/30 hover:-translate-y-1 transition-all duration-300 group aspect-square"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 object-contain filter invert opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-gray-400 text-xs group-hover:text-white transition-colors">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
