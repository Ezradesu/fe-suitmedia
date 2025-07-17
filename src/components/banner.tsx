// components/Banner.tsx
"use client";

import { useEffect, useState } from "react";

interface BannerProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
}

export default function Banner({
  imageUrl = "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
  title = "Ideas",
  subtitle = "Where all our great things begin",
}: BannerProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${offsetY * 0.4}px)`,
          filter: `brightness(${0.5})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mt-4 drop-shadow-md">{subtitle}</p>
      </div>

      {/* Slanted bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-white z-20 clip-slant" />
    </div>
  );
}
