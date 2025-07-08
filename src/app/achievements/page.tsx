"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { fetchAchievements, type Achievement } from "@/lib/data-fetcher";
import { ExternalLink } from "lucide-react";

const CATEGORY_ORDER = [
  "Leadership",
  "Trips",
  "Robotics",
  "Work Experience",
  "Academic",
  "Community Service",
  "Personal Development",
  "Co-curricular",
];

interface AchievementWithLink extends Achievement {
  link?: string;
  image?: string;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<AchievementWithLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredAchievement, setHoveredAchievement] =
    useState<AchievementWithLink | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const cached =
          typeof window !== "undefined"
            ? sessionStorage.getItem("achievements")
            : null;
        if (cached) {
          const parsed = JSON.parse(cached);
          setAchievements(parsed);
        } else {
          const data = await fetchAchievements();
          setAchievements(data.achievements);
          sessionStorage.setItem(
            "achievements",
            JSON.stringify(data.achievements)
          );
        }
      } catch (error) {
        console.error("Error loading achievements:", error);
      } finally {
        setIsLoading(false);
        setTimeout(() => setIsLoaded(true), 100);
      }
    };

    loadAchievements();
  }, []);

  useEffect(() => {
    achievements.forEach((a) => {
      if (a.image) {
        const img = new window.Image();
        img.src = a.image;
      }
    });
  }, [achievements]);

  const grouped = useMemo(() => {
    return achievements.reduce<Record<string, AchievementWithLink[]>>(
      (acc, achievement) => {
        const category = achievement.category || "Other";
        if (!acc[category]) acc[category] = [];
        acc[category].push(achievement);
        return acc;
      },
      {}
    );
  }, [achievements]);

  const sortedCategories = useMemo(() => {
    return [
      ...CATEGORY_ORDER.filter((cat) => grouped[cat]),
      ...Object.keys(grouped)
        .filter((cat) => !CATEGORY_ORDER.includes(cat))
        .sort(),
    ];
  }, [grouped]);

  const handleMouseEnter = (achievement: AchievementWithLink) => {
    if (achievement.image) setHoveredAchievement(achievement);
  };

  const handleMouseLeave = () => setHoveredAchievement(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX + 20, y: e.clientY + 20 });
  };

  if (isLoading) {
    return (
      <section className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div className="text-2xl font-black">Loading Achievements...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-4 sm:p-8 relative">
      <div
        className={`max-w-6xl mx-auto transition-all duration-1000 ease-out
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        <h1
          className={`text-3xl sm:text-5xl md:text-7xl font-black mb-8 sm:mb-16 text-center transition-all duration-1000
            ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }
          `}
        >
          Achievements
        </h1>
        {sortedCategories.map((category, catIdx) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 border-b-4 border-black pb-2">
              {category}
            </h2>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000
                ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
            >
              {grouped[category].map((achievement, index) => (
                <div
                  key={index}
                  className={`border-4 border-black p-4 sm:p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-500 ease-out transform relative
                    ${
                      isLoaded
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }
                  `}
                  style={{ transitionDelay: `${index * 100 + catIdx * 100}ms` }}
                  onMouseEnter={() => handleMouseEnter(achievement)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xl sm:text-2xl font-black">
                      {achievement.title}
                    </div>
                    <span className="px-2 py-1 bg-black text-white font-black text-xs">
                      {achievement.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black mb-3 leading-tight flex items-center gap-2">
                    {achievement.description}
                    {achievement.link && (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-1 text-black hover:text-blue-600"
                        aria-label="Open competition website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </h3>
                  <p className="font-bold text-xs sm:text-sm leading-relaxed">
                    {achievement.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hoveredAchievement?.image && (
        <div
          className="fixed z-50 pointer-events-none transition-opacity duration-300"
          style={{
            top: cursorPosition.y,
            left: cursorPosition.x,
          }}
        >
          <Image
            src={hoveredAchievement.image}
            alt="Achievement preview"
            width={400}
            height={400}
            className="max-w-[400px] max-h-[400px] object-contain rounded-lg shadow-lg border-2 border-black"
            priority
          />
        </div>
      )}
    </section>
  );
}
