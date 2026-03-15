import api from "@/services/api"
import { volumeFromApi } from "../adapters/volume.adapter"
import type {
  Volume,
  VolumeApiResponse,
  CreateVolumeDto,
  UpdateVolumeDto,
} from "../types/volume.types"

export async function fetchVolumesByNovel(novelId: string): Promise<Volume[]> {
  const { data } = await api.get<VolumeApiResponse[]>(`/volumes/novels/${novelId}`)
  return data.map(volumeFromApi)
}

export async function fetchVolume(id: string): Promise<Volume> {
  const { data } = await api.get<VolumeApiResponse>(`/volumes/${id}`)
  return volumeFromApi(data)
}

export async function createVolume(dto: CreateVolumeDto): Promise<Volume> {
  const { data } = await api.post<VolumeApiResponse>("/volumes", dto)
  return volumeFromApi(data)
}

export async function updateVolume(id: string, dto: UpdateVolumeDto): Promise<Volume> {
  const { data } = await api.patch<VolumeApiResponse>(`/volumes/${id}`, dto)
  return volumeFromApi(data)
}

export async function deleteVolume(id: string): Promise<void> {
  await api.delete(`/volumes/${id}`)
}
