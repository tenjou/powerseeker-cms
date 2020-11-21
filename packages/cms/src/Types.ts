export type AssetItem = {
    id: string | null
    [prop: string]: unknown
}

export type ProjectAsset = {
    id: string
    name: string
    data: AssetItem[]
}
