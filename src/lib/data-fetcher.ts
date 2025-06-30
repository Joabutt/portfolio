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
  total?: number
  page?: number
  limit?: number
  totalPages?: number
}

export async function fetchProjects(): Promise<ProjectsData> {
  const response = await fetch("/api/projects")
  return response.json()
}

export async function fetchAchievements(): Promise<AchievementsData> {
  const response = await fetch("/api/achievements")
  return response.json()
}

export async function fetchPhotos(page = 1, limit = 18): Promise<PhotosData> {
  const response = await fetch(`/api/photos?page=${page}&limit=${limit}`)
  return response.json()
}
