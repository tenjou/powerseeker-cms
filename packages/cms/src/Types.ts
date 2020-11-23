export type AssetItem = {
    [prop: string]: unknown
}

export type ProjectAsset = {
    meta: {
        id: string
        name: string
        createdAt: number
        updatedAt: number
    }
    data: AssetItem[]
}

export type ProjectAssets = Record<string, ProjectAsset>

export type ProjectMeta = {
    id: string
    name: string
    createdAt: number
    updatedAt: number
}

export type Project = {
    meta: ProjectMeta
    data: ProjectAssets
}
