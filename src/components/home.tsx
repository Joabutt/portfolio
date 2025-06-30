// app/components/HomePage.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";


import { fetchAchievements, fetchProjects, fetchPhotos } from "@/lib/data-fetcher";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  // Preload and cache achievements, projects, and photos on first visit
  useEffect(() => {
    // Use a small delay to ensure CSS transitions are triggered after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);

    // Preload and cache data if not already cached
    (async () => {
      if (typeof window !== "undefined") {
        // Achievements
        if (!sessionStorage.getItem("achievements")) {
          try {
            const data = await fetchAchievements();
            sessionStorage.setItem("achievements", JSON.stringify(data.achievements));
          } catch {}
        }
        // Projects
        if (!sessionStorage.getItem("projects")) {
          try {
            const data = await fetchProjects();
            sessionStorage.setItem("projects", JSON.stringify(data.projects));
          } catch {}
        }
        // Photos (first page only)
        if (!sessionStorage.getItem("photos")) {
          try {
            const data = await fetchPhotos(1, 18);
            sessionStorage.setItem("photos", JSON.stringify(data.photos || []));
          } catch {}
        }
      }
    })();

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-8 leading-none">
          Joab
          <br />
          Lee
        </h1>
        <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 tracking-wider">
          Engineer, Coder & Photographer
        </div>
        <p className="text-sm sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
          Fourth year student at SST. When I'm not coding, I capture the world
          through my lens. Where precision meets creativity, and every project
          has a purpose.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <Link
            href="/projects"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black text-white border-4 border-black font-black text-sm sm:text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 ease-out text-center"
          >
            View Work
          </Link>
          <Link
            href="/photos"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black border-4 border-black font-black text-sm sm:text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 ease-out text-center"
          >
            View Photos
          </Link>
        </div>
      </div>
    </section>
  );
}
