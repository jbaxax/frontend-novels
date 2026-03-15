import api from "@/services/api"
import { locationFromApi } from "../adapters/location.adapter"
import type {
  Location,
  LocationApiResponse,
  CreateLocationDto,
  UpdateLocationDto,
} from "../types/location.types"

export async function fetchLocationsByNovel(novelId: string): Promise<Location[]> {
  const { data } = await api.get<LocationApiResponse[]>(`/locations/novels/${novelId}`)
  return data.map(locationFromApi)
}

export async function createLocation(dto: CreateLocationDto): Promise<Location> {
  const { data } = await api.post<LocationApiResponse>("/locations", dto)
  return locationFromApi(data)
}

export async function updateLocation(
  id: string,
  dto: UpdateLocationDto,
): Promise<Location> {
  const { data } = await api.patch<LocationApiResponse>(`/locations/${id}`, dto)
  return locationFromApi(data)
}

export async function deleteLocation(id: string): Promise<void> {
  await api.delete(`/locations/${id}`)
}
