// hooks/useScrollDirection.ts
import { useEffect, useState } from "react";

export const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      if (Math.abs(scrollY - lastScrollY) > 5) {
        setScrollDir(scrollY > lastScrollY ? "down" : "up");
        lastScrollY = scrollY;
      }
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return scrollDir;
};
