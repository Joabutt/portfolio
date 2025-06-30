"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { fetchPhotos, type Photo } from "@/lib/data-fetcher"
import Image from "next/image"

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = 18

  // Always scroll to top on mount (fixes scroll position issue)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animate page entrance
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  useEffect(() => {
    const loadPhotos = async () => {
      // Try to get cached photos from sessionStorage (only for first page)
      if (page === 1) {
        const cached = typeof window !== "undefined" ? sessionStorage.getItem("photos") : null;
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            setPhotos(parsed);
            setIsLoading(false);
            setHasMore(parsed.length >= limit); // crude check for more
            return;
          } catch (e) {
            // If parsing fails, ignore and fetch fresh
          }
        }
      }
      try {
        const data = await fetchPhotos(page, limit)
        if (page === 1) {
          setPhotos(data.photos || [])
          // Cache in sessionStorage
          if (typeof window !== "undefined") {
            sessionStorage.setItem("photos", JSON.stringify(data.photos || []));
          }
        } else {
          setPhotos((prev) => [...prev, ...(data.photos || [])])
        }
        setHasMore((data.page || 1) < (data.totalPages || 1))
      } catch (error) {
        console.error("Error loading photos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const loadMore = () => {
    if (hasMore) setPage((p) => p + 1)
  }

  if (isLoading) {
    return (
      <section className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div className="text-2xl font-black">Loading Photos...</div>
      </section>
    )
  }

  return (
    <section className="min-h-screen p-4 sm:p-8 bg-white">
      <div
        className={`max-w-7xl mx-auto transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className={`text-3xl sm:text-5xl md:text-7xl font-black mb-8 sm:mb-16 text-center transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Photos
        </h1>

        <div
          className={`mb-6 sm:mb-8 text-center transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <p className="text-sm sm:text-base font-bold text-gray-600">{photos.length} Photos</p>
        </div>

        {/* CSS Masonry Grid - No overlapping */}
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4" style={{ columnFill: "balance" }}>
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`break-inside-avoid border-4 border-black bg-white transition-all duration-500 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] mb-4 overflow-hidden group ease-out transform ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 50 + 300}ms`,
                }}
              >
                {/* Photo - No fixed height, natural dimensions */}
                <div className="relative">
                  <Image
                    src={photo.image || `https://picsum.photos/400/600?random=${photo.id}`}
                    alt={photo.title}
                    className="w-full h-auto block transition-all duration-500"
                    width={400}
                    height={600}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg width='400' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='600' fill='%23e5e7eb'/%3E%3C/svg%3E"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                    onLoadingComplete={() => console.log(`✅ Image loaded: ${photo.image}`)}
                    onError={() => console.log(`❌ Image failed: ${photo.image}`)}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-black text-sm sm:text-base mb-1">{photo.title}</h3>
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{photo.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black text-white px-2 py-1 font-black text-xs sm:text-sm">
                    {photo.category}
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white text-black px-2 py-1 font-black text-xs border-2 border-black">
                    {photo.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-black text-white font-bold rounded shadow hover:bg-gray-800 transition"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
