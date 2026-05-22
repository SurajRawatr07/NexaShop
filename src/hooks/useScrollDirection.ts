import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setScrollDir(y > lastY ? "down" : "up");
      setScrollY(y);
      lastY = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return { scrollDir, scrollY };
}
