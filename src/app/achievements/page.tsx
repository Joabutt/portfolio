"use client";

import { useState, useEffect } from "react";
import { fetchAchievements, type Achievement } from "@/lib/data-fetcher";
import { ExternalLink } from "lucide-react";

// Define the order and display names for categories
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
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<AchievementWithLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Always scroll to top on mount (fixes scroll position issue)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animate page entrance
  useEffect(() => {
    // Use a small delay to ensure CSS transitions are triggered after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadAchievements = async () => {
      // Try to get cached achievements from sessionStorage
      const cached = typeof window !== "undefined" ? sessionStorage.getItem("achievements") : null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setAchievements(parsed);
          setIsLoading(false);
          return;
        } catch (e) {
          // If parsing fails, ignore and fetch fresh
        }
      }
      try {
        const data = await fetchAchievements();
        setAchievements(data.achievements);
        // Cache in sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.setItem("achievements", JSON.stringify(data.achievements));
        }
      } catch (error) {
        console.error("Error loading achievements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAchievements();
  }, []);

  // Group achievements by category
  const grouped = achievements.reduce<Record<string, AchievementWithLink[]>>(
    (acc, achievement) => {
      const category = achievement.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(achievement);
      return acc;
    },
    {}
  );

  // Sort categories by predefined order, then alphabetically
  const sortedCategories = [
    ...CATEGORY_ORDER.filter((cat) => grouped[cat]),
    ...Object.keys(grouped)
      .filter((cat) => !CATEGORY_ORDER.includes(cat))
      .sort(),
  ];

  if (isLoading) {
    return (
      <section className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div className="text-2xl font-black">Loading Achievements...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-4 sm:p-8">
      <div
        className={`max-w-6xl mx-auto transition-all duration-1000 ease-out
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        <h1
          className={`text-3xl sm:text-5xl md:text-7xl font-black mb-8 sm:mb-16 text-center transition-all duration-1000
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
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
                ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              {grouped[category].map((achievement, index) => (
                <div
                  key={index}
                  className={`border-4 border-black p-4 sm:p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-500 ease-out transform
                    ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                  style={{ transitionDelay: `${index * 100 + catIdx * 100}ms` }}
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
    </section>
  );
}