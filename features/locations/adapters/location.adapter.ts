import type { Location, LocationApiResponse } from "../types/location.types"

export function locationFromApi(data: LocationApiResponse): Location {
  return {
    id: data.id,
    novelId: data.novelId,
    name: data.name,
    description: data.description,
    parentId: data.parentId,
    parent: data.parent,
  }
}
