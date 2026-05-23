import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  viewAllLink?: string;
  gradient?: boolean;
}

export default function SectionHeader({ title, subtitle, badge, viewAllLink, gradient }: SectionHeaderProps) {
  const { theme } = useStore();
  const isDark = theme === "dark";

  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        {badge && (
          <span className="badge-sale mb-1.5 inline-block">{badge}</span>
        )}
        <h2 className={cn("text-base md:text-lg font-bold", isDark ? "text-white" : "text-gray-900")}>
          {title}
        </h2>
        {subtitle && (
          <p className={cn("text-xs mt-0.5", isDark ? "text-gray-400" : "text-gray-500")}>{subtitle}</p>
        )}
      </div>
      {viewAllLink && (
        <Link
          to={viewAllLink}
          className={cn("flex items-center gap-0.5 text-xs font-semibold uppercase tracking-wide", isDark ? "text-brand-400" : "text-brand-500")}
        >
          View All <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
