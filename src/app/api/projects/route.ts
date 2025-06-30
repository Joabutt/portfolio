import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "projects.yaml")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = yaml.load(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    // Return fallback data if file doesn't exist
    return NextResponse.json({
      projects: [
        {
          title: "Sample Project",
          description: "This is a sample project. Please add your projects to data/projects.yaml",
          type: "Web Development",
          skills: ["React", "Next.js"],
          image: "/placeholder.svg?height=300&width=400",
          year: "2024",
        },
      ],
    })
  }
}
