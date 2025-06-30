"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface MasonryGridProps {
  children: React.ReactNode[]
  columns?: number
  gap?: number
  className?: string
}

export default function MasonryGrid({ children, columns = 3, gap = 16, className = "" }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnHeights, setColumnHeights] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [responsiveColumns, setResponsiveColumns] = useState(columns)

  // Handle responsive columns
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setResponsiveColumns(1) // Mobile: 1 column
      } else if (width < 1024) {
        setResponsiveColumns(2) // Tablet: 2 columns
      } else {
        setResponsiveColumns(3) // Desktop: 3 columns
      }
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      layoutMasonry()
    })

    resizeObserver.observe(container)
    layoutMasonry()

    return () => {
      resizeObserver.disconnect()
    }
  }, [children, responsiveColumns, gap])

  const layoutMasonry = () => {
    const container = containerRef.current
    if (!container) return

    const containerWidth = container.offsetWidth
    const columnWidth = (containerWidth - gap * (responsiveColumns - 1)) / responsiveColumns
    const heights = new Array(responsiveColumns).fill(0)

    Array.from(container.children).forEach((child, index) => {
      const element = child as HTMLElement
      const shortestColumnIndex = heights.indexOf(Math.min(...heights))

      element.style.position = "absolute"
      element.style.width = `${columnWidth}px`
      element.style.left = `${shortestColumnIndex * (columnWidth + gap)}px`
      element.style.top = `${heights[shortestColumnIndex]}px`
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"

      heights[shortestColumnIndex] += element.offsetHeight + gap
    })

    setColumnHeights(heights)
    setIsLoaded(true)
  }

  const containerHeight = Math.max(...columnHeights) - gap

  // Responsive columns already handled
  // Add horizontal scroll protection and padding for mobile
  return (
    <div
      ref={containerRef}
      className={`relative transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ height: containerHeight > 0 ? `${containerHeight}px` : "auto", overflowX: 'hidden', paddingLeft: 4, paddingRight: 4 }}
    >
      {children.map((child, _) => (
        <div style={{ marginBottom: gap }}>
          {child}
        </div>
      ))}
    </div>
  )
}
