import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Joab Lee - Portfolio | Full-Stack Developer & Photographer",
  description: "Explore the portfolio of Joab Lee: full-stack developer, engineer, and photographer. Projects, achievements, and a curated photo gallery from around the world.",
  keywords: [
    "Joab Lee",
    "Portfolio",
    "Full-Stack Developer",
    "Photographer",
    "Engineer",
    "Projects",
    "Achievements",
    "Gallery",
    "Shanghai",
    "Hangzhou",
    "Singapore",
    "Nature Photography",
    "Street Photography"
  ],
  metadataBase: new URL("https://joabl.ee/")
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="author" content="Joab Lee" />
        <meta name="robots" content="index, follow" />
        <meta name="instagram" content="@jooaabs" />
        <meta name="linkedin" content="https://www.linkedin.com/in/joabl/" />
        <meta name="github" content="https://github.com/joabutt" />
      </head>
      <body className={`${inter.className} font-mono`}>
        {/* Layout container */}
        <div className="flex flex-col min-h-screen bg-white text-black">
          {/* Fixed Navbar */}
          <Navigation />

          {/* Page content with top padding to avoid overlapping with fixed nav */}
          <main className="flex-1 pt-24">{children}</main>

          {/* Footer always at the bottom */}
          <Footer />
        </div>
      </body>
    </html>
  )
}
