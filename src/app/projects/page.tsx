"use client";

import { useState, useEffect } from "react";
import { ExternalLink, X } from "lucide-react";
import { fetchProjects, type Project } from "@/lib/data-fetcher";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Always scroll to top on mount (fixes scroll position issue)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animate page entrance
  useEffect(() => {
    // Use a small delay to ensure CSS transitions are triggered after mount
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      // Try to get cached projects from sessionStorage
      const cached = typeof window !== "undefined" ? sessionStorage.getItem("projects") : null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setProjects(parsed);
          setIsLoading(false);
          return;
        } catch (e) {
          // If parsing fails, ignore and fetch fresh
        }
      }
      try {
        const data = await fetchProjects();
        setProjects(data.projects);
        // Cache in sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.setItem("projects", JSON.stringify(data.projects));
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Save scroll position when opening modal and lock scroll on body
  useEffect(() => {
    if (expandedProject) {
      setScrollY(window.scrollY);
      document.body.style.overflow = "hidden";
      setTimeout(() => setModalVisible(true), 10);
    } else {
      setModalVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedProject]);

  // When modalVisible becomes false, wait for animation before unmounting modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setExpandedProject(null), 200);
  };

  if (isLoading) {
    return (
      <section className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div className="text-2xl font-black">Loading Projects...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-4 sm:p-8 bg-white">
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
          Projects
        </h1>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 transition-all duration-1000
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          {projects.map((project: Project, index: number) => (
            <div
              key={index}
              onClick={() => setExpandedProject(project)}
              className={`border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-500 ease-out transform cursor-pointer
                ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Project Image */}
              <div className="aspect-video bg-gray-200 border-b-4 border-black relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg?height=300&width=400"}
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale hover:filter-none transition-all duration-500"
                />
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black text-white px-2 py-1 font-black text-xs sm:text-sm">
                  {project.year}
                </div>
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white text-black px-2 py-1 font-black text-xs border-2 border-black">
                  {project.type}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black leading-tight pr-2">
                    {project.title}
                  </h2>
                  {project.link && (
                    <div className="p-2 border-2 border-black bg-white flex-shrink-0">
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6 font-bold leading-relaxed line-clamp-3">
                  {project.description.length > 120
                    ? `${project.description.substring(0, 120)}...`
                    : project.description}
                </p>
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  {project.skills
                    .slice(0, 4)
                    .map((skill: string, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className="px-2 sm:px-3 py-1 bg-black text-white font-black text-xs border-2 border-black"
                      >
                        {skill}
                      </span>
                    ))}
                  {project.skills.length > 4 && (
                    <span className="px-2 sm:px-3 py-1 bg-gray-200 text-black font-black text-xs border-2 border-black">
                      +{project.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Project Modal */}
        {expandedProject && (
          <div
            className="fixed left-0 w-full z-[100] flex items-start justify-center p-4"
            style={{
              top: `calc(${scrollY}px - 5vh)`,
              height: "100vh",
              pointerEvents: "auto",
            }}
          >
            {/* Overlay for click outside */}
            <button
              className="fixed inset-0 z-0 cursor-default"
              aria-label="Close modal"
              tabIndex={-1}
              onClick={handleCloseModal}
              style={{ background: "transparent", border: "none" }}
            />
            {/* Modal */}
            <div
              className={`relative max-w-4xl w-full max-h-[90vh] transition-all duration-200 ease-in-out z-10
                ${modalVisible
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                }`}
              onClick={e => e.stopPropagation()} // Prevent modal click from closing
            >
              {/* Modal Shadow */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black opacity-100 z-0 rounded-none pointer-events-none" />
              {/* Modal Content */}
              <div className="relative bg-white border-4 sm:border-8 border-black shadow-none z-10 max-h-[90vh] overflow-y-auto overscroll-contain">
                <div className="p-4 sm:p-8">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-2">
                        {expandedProject.title}
                      </h2>
                      <span className="px-3 py-1 bg-black text-white font-black text-xs sm:text-sm">
                        {expandedProject.type}
                      </span>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-200"
                      style={{ zIndex: 20 }}
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>

                  <div className="aspect-video bg-gray-200 border-4 border-black mb-4 sm:mb-6 overflow-hidden">
                    <img
                      src={
                        expandedProject.image ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={expandedProject.title}
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="md:col-span-2">
                      <h3 className="text-lg sm:text-xl font-black mb-3">
                        Description
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 whitespace-pre-line">
                        {expandedProject.description}
                      </p>

                      <h3 className="text-lg sm:text-xl font-black mb-3">
                        Skills & Technologies
                      </h3>
                      <div className="flex gap-2 flex-wrap mb-4 sm:mb-6">
                        {expandedProject.skills.map(
                          (skill: string, skillIndex: number) => (
                            <span
                              key={skillIndex}
                              className="px-3 sm:px-4 py-1 sm:py-2 bg-black text-white font-black text-xs sm:text-sm border-2 border-black"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-black mb-3">
                        Project Info
                      </h3>
                      <div className="border-2 border-black p-3 sm:p-4 bg-gray-50">
                        <div className="mb-3">
                          <span className="font-black">Year:</span>{" "}
                          {expandedProject.year}
                        </div>
                        <div className="mb-3">
                          <span className="font-black">Type:</span>{" "}
                          {expandedProject.type}
                        </div>
                        {expandedProject.link && (
                          <a
                            href={expandedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 sm:px-4 py-2 bg-black text-white border-2 border-black font-black text-xs sm:text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            View Project
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}