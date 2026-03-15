export interface Location {
  id: string
  novelId: string
  name: string
  description: string | null
  parentId: string | null
  parent: { id: string; name: string } | null
}

export interface LocationApiResponse {
  id: string
  novelId: string
  name: string
  description: string | null
  parentId: string | null
  parent: { id: string; name: string } | null
}

export interface CreateLocationDto {
  novelId: string
  name: string
  description?: string
  parentId?: string
}

export interface UpdateLocationDto extends Partial<Omit<CreateLocationDto, "novelId">> {}
