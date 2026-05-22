import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  badge?: string;
  gradient?: boolean;
}

export default function SectionHeader({ title, subtitle, viewAllLink, badge, gradient }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        {badge && (
          <span className="badge-sale mb-2 inline-block">{badge}</span>
        )}
        <h2 className={`section-title ${gradient ? "text-gradient" : "text-white"}`}>
          {title}
        </h2>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="flex items-center gap-1 text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors group"
        >
          View All
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
