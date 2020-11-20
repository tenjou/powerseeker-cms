export type DataEntry = {
    id: unknown
    name: unknown
    level: unknown
}

export type ProjectAsset = {
    id: string
    name: string
    data: Record<string, ProjectAsset>
}
