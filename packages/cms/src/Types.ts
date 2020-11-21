export type AssetItem = {
    id: string
    [prop: string]: unknown
}

export type ProjectAsset = {
    id: string
    name: string
    createdAt: number
    updatedAt: number
    data: AssetItem[]
}

export type Project = {
    meta: {
        id: string
        name: string
        createdAt: number
        updatedAt: number
    }
    data: Record<string, ProjectAsset>
}
