"use client"

import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <section className="min-h-screen p-4 sm:p-8 bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Title */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black mb-4 sm:mb-6 leading-none">404</h1>
          <div className="text-xl sm:text-2xl md:text-3xl font-black mb-4 sm:mb-6">PAGE NOT FOUND</div>
          <p className="text-sm sm:text-base font-bold text-gray-600 mb-8 sm:mb-12 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black text-white border-4 border-black font-black text-sm sm:text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 ease-out text-center inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black border-4 border-black font-black text-sm sm:text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 ease-out text-center inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Go Back
          </button>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 sm:mt-12">
          <div className="text-sm font-black mb-4">OR EXPLORE:</div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/projects"
              className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white font-black text-xs transition-all duration-200"
            >
              PROJECTS
            </Link>
            <Link
              href="/achievements"
              className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white font-black text-xs transition-all duration-200"
            >
              ACHIEVEMENTS
            </Link>
            <Link
              href="/photos"
              className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white font-black text-xs transition-all duration-200"
            >
              PHOTOS
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
