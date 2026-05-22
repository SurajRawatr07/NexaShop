import React from "react";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";
import type { Product } from "@/types";

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  badge?: string;
  viewAllLink?: string;
  gradient?: boolean;
  cols?: number;
}

export default function ProductGrid({ title, subtitle, products, badge, viewAllLink, gradient, cols = 4 }: ProductGridProps) {
  const colClass: Record<number, string> = {
    2: "grid-cols-2 sm:grid-cols-2 md:grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  };

  return (
    <section className="py-12">
      <div className="container-custom">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          badge={badge}
          viewAllLink={viewAllLink}
          gradient={gradient}
        />
        <div className={`grid ${colClass[cols] || colClass[4]} gap-3 md:gap-4`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
