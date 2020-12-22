import styled from "styled-components"
import type { AssetItem, Project, ProjectAsset } from "../../Types"
import { Schema, Schemas } from "../schema/Types"

interface ExportProps {
    project: Project
    schemas: Schemas
}
const Export = ({ project, schemas }: ExportProps) => {
    const dataTransformed: Record<string, Record<string, AssetItem>> = {}
    for (let assetId in project.data) {
        const asset = project.data[assetId]
        const schema = schemas[assetId]
        const transformedAssetData = transformAssetData(asset, schema)
        if (!transformedAssetData) {
            continue
        }
        dataTransformed[asset.meta.name] = transformedAssetData
    }

    const projectTransformed = dataTransformed
    const output = JSON.stringify(projectTransformed, null, 4)

    return (
        <ExportContainer>
            <Pre>{output}</Pre>
        </ExportContainer>
    )
}

const findUID = (schema: Schema): string | null => {
    for (let n = 0; n < schema.length; n++) {
        const entry = schema[n]
        if (entry.type === "uid") {
            return entry.key
        }
    }

    return null
}

const transformAssetData = (asset: ProjectAsset, schema: Schema) => {
    const uidKey = findUID(schema)
    if (!uidKey) {
        return null
    }

    const transformedData: Record<string, AssetItem> = {}

    for (let n = 0; n < asset.data.length; n++) {
        const entry = asset.data[n]
        const entryUID = entry[uidKey] as string
        transformedData[entryUID] = entry
    }

    return transformedData
}

const ExportContainer = styled.div`
    width: 100%;
`

const Pre = styled.pre`
    user-select: all;
`

export default Export
