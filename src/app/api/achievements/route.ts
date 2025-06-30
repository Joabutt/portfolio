import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "achievements.yaml")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = yaml.load(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    // Return fallback data if file doesn't exist
    return NextResponse.json({
      achievements: [
        {
          title: "Sample Achievement",
          description: "This is a sample achievement. Please add your achievements to data/achievements.yaml",
          year: "2024",
          category: "Sample",
        },
      ],
    })
  }
}
