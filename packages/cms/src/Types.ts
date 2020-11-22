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

export type Project = {
    meta: {
        id: string
        name: string
        createdAt: number
        updatedAt: number
    }
    data: Record<string, ProjectAsset>
}
