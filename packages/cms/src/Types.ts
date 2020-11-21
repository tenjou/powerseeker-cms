export type Project = {
    meta: {
        id: string
        name: string
        createdAt: number
        updatedAt: number
    }
    data: Record<string, ProjectAsset>
}

export type AssetItem = {
    id: string | null
    [prop: string]: unknown
}

export type ProjectAsset = {
    id: string
    name: string
    data: AssetItem[]
}
