import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "18", 10)
  try {
    const filePath = path.join(process.cwd(), "data", "photos.yaml")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = yaml.load(fileContents) as { photos: any[] }
    const photos = data.photos || []
    const start = (page - 1) * limit
    const end = start + limit
    const paginated = photos.slice(start, end)
    return NextResponse.json({
      photos: paginated,
      total: photos.length,
      page,
      limit,
      totalPages: Math.ceil(photos.length / limit),
    })
  } catch (error) {
    // Return simplified fallback data without folders
    return NextResponse.json({
      photos: [
        // Street Photography
        {
          id: 1,
          title: "Neon Reflections",
          location: "Tokyo, Japan",
          image: "https://picsum.photos/400/500?random=neon",
          category: "Street",
          year: "2024",
        },
        {
          id: 2,
          title: "Rush Hour Shadows",
          location: "Manhattan, NYC",
          image: "https://picsum.photos/400/600?random=rush",
          category: "Street",
          year: "2024",
        },
        {
          id: 3,
          title: "Market Vendor",
          location: "Marrakech, Morocco",
          image: "https://picsum.photos/400/450?random=market",
          category: "Street",
          year: "2024",
        },
        {
          id: 4,
          title: "Underground Station",
          location: "London, UK",
          image: "https://picsum.photos/400/550?random=underground",
          category: "Street",
          year: "2023",
        },
        {
          id: 5,
          title: "Street Musician",
          location: "Barcelona, Spain",
          image: "https://picsum.photos/400/480?random=musician",
          category: "Street",
          year: "2023",
        },
        {
          id: 6,
          title: "Rainy Night",
          location: "Seoul, South Korea",
          image: "https://picsum.photos/400/520?random=rain",
          category: "Street",
          year: "2023",
        },
        {
          id: 7,
          title: "Night Market",
          location: "Bangkok, Thailand",
          image: "https://picsum.photos/400/470?random=nightmarket",
          category: "Street",
          year: "2023",
        },

        // Architecture
        {
          id: 8,
          title: "Brutalist Tower",
          location: "Berlin, Germany",
          image: "https://picsum.photos/400/600?random=brutalist",
          category: "Architecture",
          year: "2024",
        },
        {
          id: 9,
          title: "Glass Cathedral",
          location: "Singapore",
          image: "https://picsum.photos/400/550?random=glass",
          category: "Architecture",
          year: "2024",
        },
        {
          id: 10,
          title: "Concrete Curves",
          location: "Barcelona, Spain",
          image: "https://picsum.photos/400/480?random=concrete",
          category: "Architecture",
          year: "2024",
        },
        {
          id: 11,
          title: "Modern Minimalism",
          location: "Copenhagen, Denmark",
          image: "https://picsum.photos/400/520?random=minimal",
          category: "Architecture",
          year: "2023",
        },
        {
          id: 12,
          title: "Steel and Stone",
          location: "Chicago, USA",
          image: "https://picsum.photos/400/580?random=steel",
          category: "Architecture",
          year: "2023",
        },

        // Portraits
        {
          id: 13,
          title: "Golden Hour Portrait",
          location: "New York, USA",
          image: "https://picsum.photos/400/500?random=golden",
          category: "Portrait",
          year: "2024",
        },
        {
          id: 14,
          title: "Studio Session",
          location: "Brooklyn, USA",
          image: "https://picsum.photos/400/450?random=studio",
          category: "Portrait",
          year: "2024",
        },
        {
          id: 15,
          title: "Natural Light",
          location: "Paris, France",
          image: "https://picsum.photos/400/530?random=natural",
          category: "Portrait",
          year: "2024",
        },
        {
          id: 16,
          title: "Urban Portrait",
          location: "London, UK",
          image: "https://picsum.photos/400/490?random=urban",
          category: "Portrait",
          year: "2023",
        },
        {
          id: 17,
          title: "Black and White",
          location: "London, UK",
          image: "https://picsum.photos/400/560?random=blackwhite",
          category: "Portrait",
          year: "2023",
        },

        // Landscape
        {
          id: 18,
          title: "Alpine Sunrise",
          location: "Swiss Alps",
          image: "https://picsum.photos/600/400?random=alpine",
          category: "Landscape",
          year: "2024",
        },
        {
          id: 19,
          title: "Ocean Waves",
          location: "California, USA",
          image: "https://picsum.photos/600/450?random=ocean",
          category: "Landscape",
          year: "2024",
        },
        {
          id: 20,
          title: "Desert Sunset",
          location: "Arizona, USA",
          image: "https://picsum.photos/600/400?random=desert",
          category: "Landscape",
          year: "2024",
        },
        {
          id: 21,
          title: "Misty Forest",
          location: "Oregon, USA",
          image: "https://picsum.photos/400/500?random=forest",
          category: "Landscape",
          year: "2023",
        },
        {
          id: 22,
          title: "Mountain Lake",
          location: "Banff, Canada",
          image: "https://picsum.photos/600/400?random=lake",
          category: "Landscape",
          year: "2023",
        },
        {
          id: 23,
          title: "Northern Lights",
          location: "Iceland",
          image: "https://picsum.photos/600/450?random=aurora",
          category: "Landscape",
          year: "2023",
        },

        // Travel
        {
          id: 24,
          title: "Temple Steps",
          location: "Kyoto, Japan",
          image: "https://picsum.photos/400/550?random=temple",
          category: "Travel",
          year: "2024",
        },
        {
          id: 25,
          title: "Spice Market",
          location: "Istanbul, Turkey",
          image: "https://picsum.photos/400/480?random=spice",
          category: "Travel",
          year: "2024",
        },
        {
          id: 26,
          title: "Ancient Ruins",
          location: "Rome, Italy",
          image: "https://picsum.photos/400/520?random=ruins",
          category: "Travel",
          year: "2023",
        },
        {
          id: 27,
          title: "Floating Market",
          location: "Bangkok, Thailand",
          image: "https://picsum.photos/400/460?random=floating",
          category: "Travel",
          year: "2023",
        },
        {
          id: 28,
          title: "Colorful Houses",
          location: "Burano, Italy",
          image: "https://picsum.photos/400/500?random=colorful",
          category: "Travel",
          year: "2023",
        },

        // Events
        {
          id: 29,
          title: "Concert Energy",
          location: "Madison Square Garden",
          image: "https://picsum.photos/600/400?random=concert",
          category: "Events",
          year: "2024",
        },
        {
          id: 30,
          title: "Wedding Ceremony",
          location: "Central Park, NYC",
          image: "https://picsum.photos/400/500?random=wedding",
          category: "Events",
          year: "2023",
        },
        {
          id: 31,
          title: "Tech Conference",
          location: "San Francisco, CA",
          image: "https://picsum.photos/600/450?random=tech",
          category: "Events",
          year: "2024",
        },
        {
          id: 32,
          title: "Art Gallery Opening",
          location: "Chelsea, NYC",
          image: "https://picsum.photos/400/480?random=gallery",
          category: "Events",
          year: "2023",
        },
        {
          id: 33,
          title: "Music Festival",
          location: "Austin, Texas",
          image: "https://picsum.photos/600/400?random=festival",
          category: "Events",
          year: "2023",
        },

        // Documentary
        {
          id: 34,
          title: "Factory Worker",
          location: "Detroit, Michigan",
          image: "https://picsum.photos/400/520?random=factory",
          category: "Documentary",
          year: "2024",
        },
        {
          id: 35,
          title: "Fisherman's Life",
          location: "Maine, USA",
          image: "https://picsum.photos/400/480?random=fisherman",
          category: "Documentary",
          year: "2024",
        },
        {
          id: 36,
          title: "Urban Farming",
          location: "Brooklyn, NYC",
          image: "https://picsum.photos/400/450?random=farming",
          category: "Documentary",
          year: "2023",
        },
        {
          id: 37,
          title: "Street Art Culture",
          location: "Berlin, Germany",
          image: "https://picsum.photos/400/550?random=streetart",
          category: "Documentary",
          year: "2023",
        },

        // Nature
        {
          id: 38,
          title: "Wildlife Portrait",
          location: "Yellowstone, USA",
          image: "https://picsum.photos/400/500?random=wildlife",
          category: "Nature",
          year: "2023",
        },
        {
          id: 39,
          title: "Macro Flower",
          location: "Botanical Garden, NYC",
          image: "https://picsum.photos/400/600?random=flower",
          category: "Nature",
          year: "2024",
        },
        {
          id: 40,
          title: "Forest Path",
          location: "Pacific Northwest",
          image: "https://picsum.photos/400/520?random=path",
          category: "Nature",
          year: "2023",
        },
        {
          id: 41,
          title: "Bird in Flight",
          location: "Central Park, NYC",
          image: "https://picsum.photos/400/480?random=bird",
          category: "Nature",
          year: "2023",
        },
      ],
    })
  }
}
