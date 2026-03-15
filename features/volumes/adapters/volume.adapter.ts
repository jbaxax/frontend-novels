import type { Volume, VolumeApiResponse } from "../types/volume.types"

export function volumeFromApi(data: VolumeApiResponse): Volume {
  return {
    id: data.id,
    novelId: data.novelId,
    number: data.number,
    title: data.title,
    synopsis: data.synopsis,
    focus: data.focus,
    createdAt: new Date(data.created_at),
  }
}
