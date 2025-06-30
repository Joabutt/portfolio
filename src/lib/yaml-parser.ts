import fs from "fs"
import path from "path"
import yaml from "js-yaml"

export interface Project {
  title: string
  description: string
  type: string
  skills: string[]
  link?: string
  image: string
  year: string
}

export interface Achievement {
  title: string
  description: string
  year: string
  category: string
}

export interface Photo {
  id: number
  title: string
  location: string
  image: string
  category: string
  year: string
}

export interface ProjectsData {
  projects: Project[]
}

export interface AchievementsData {
  achievements: Achievement[]
}

export interface PhotosData {
  photos: Photo[]
}

// Function to read and parse YAML files (server-side only)
function readYamlFile<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "data", filename)
  const fileContents = fs.readFileSync(filePath, "utf8")
  return yaml.load(fileContents) as T
}

export function getProjectsData(): ProjectsData {
  return readYamlFile<ProjectsData>("projects.yaml")
}

export function getAchievementsData(): AchievementsData {
  return readYamlFile<AchievementsData>("achievements.yaml")
}

export function getPhotosData(): PhotosData {
  return readYamlFile<PhotosData>("photos.yaml")
}

export const projectsData: ProjectsData = {
  projects: [],
}

export const achievementsData: AchievementsData = {
  achievements: [],
}

export const photosData: PhotosData = {
  photos: [],
}
