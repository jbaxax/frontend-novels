export interface Volume {
  id: string
  novelId: string
  number: number
  title: string
  synopsis: string | null
  focus: string | null
  createdAt: Date
}

export interface VolumeApiResponse {
  id: string
  novelId: string
  number: number
  title: string
  synopsis: string | null
  focus: string | null
  created_at: string
}

export interface CreateVolumeDto {
  novelId: string
  number: number
  title: string
  synopsis?: string
  focus?: string
}

export interface UpdateVolumeDto {
  number?: number
  title?: string
  synopsis?: string
  focus?: string
}
