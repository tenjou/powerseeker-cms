import styled from "styled-components"
import type { AssetItem, Project, ProjectAsset, ProjectAssetTransformed } from "../../Types"
import { Schema, Schemas } from "../schema/Types"

interface ExportProps {
    project: Project
    schemas: Schemas
}
const Export = ({ project, schemas }: ExportProps) => {
    const dataTransformed: Record<string, ProjectAssetTransformed> = {}
    for (let assetId in project.data) {
        const asset = project.data[assetId]
        const schema = schemas[assetId]
        const transformedAsset = transformAsset(asset, schema)
        if (!transformedAsset) {
            continue
        }
        dataTransformed[asset.meta.name] = transformedAsset
    }

    const projectTransformed = { meta: project.meta, data: dataTransformed }
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

const transformAsset = (asset: ProjectAsset, schema: Schema) => {
    const uidKey = findUID(schema)
    if (!uidKey) {
        return null
    }

    const transformedData: Record<string, AssetItem> = {}
    const transformedAsset: ProjectAssetTransformed = {
        meta: asset.meta,
        data: transformedData,
    }

    for (let n = 0; n < asset.data.length; n++) {
        const entry = asset.data[n]
        const entryUID = entry[uidKey] as string
        transformedData[entryUID] = entry
    }

    return transformedAsset
}

const ExportContainer = styled.div`
    width: 100%;
`

const Pre = styled.pre`
    user-select: all;
`

export default Export
