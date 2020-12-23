import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProjectAsset, AssetItem, Project } from "../../Types"
import SchemaService from "../schema/SchemaService"
import { SchemaDiff } from "../schema/Types"

interface AssetItemIndex {
    assetId: string
    index: number
}

interface AssetItemValue {
    assetId: string
    index: number
    key: string
    value: unknown
}

interface AddAssetItem {
    assetId: string
    data: AssetItem
}

interface AssetSchemaInput {
    assetId: string
    schemaDiff: SchemaDiff
}

interface AssetRenameInput {
    assetId: string
    name: string
}

type ProjectState = Project | null

const initialState: ProjectState = null as ProjectState

const ProjectStore = createSlice({
    name: "project",
    initialState,
    reducers: {
        load(state, action: PayloadAction<Project>) {
            return action.payload
        },

        unload() {
            return null
        },

        addAsset(state, action: PayloadAction<ProjectAsset>) {
            if (!state) {
                return
            }
            state.data[action.payload.meta.id] = action.payload
        },

        removeAsset(state, action: PayloadAction<string>) {
            if (!state) {
                return
            }
            delete state.data[action.payload]
        },

        renameAsset(state, action: PayloadAction<AssetRenameInput>) {
            if (!state) {
                return
            }
            state.data[action.payload.assetId].meta.name = action.payload.name
        },

        addRow(state, action: PayloadAction<AddAssetItem>) {
            if (!state) {
                return
            }
            const asset = state.data[action.payload.assetId]
            asset.data.push(action.payload.data)
        },

        update(state, action: PayloadAction<AssetSchemaInput>) {
            if (!state) {
                return
            }

            const diff = action.payload.schemaDiff
            const asset = state.data[action.payload.assetId]
            asset.meta.updatedAt = Date.now()

            for (let n = 0; n < diff.added.length; n++) {
                const schemaItem = diff.added[n]
                for (let m = 0; m < asset.data.length; m++) {
                    asset.data[m][schemaItem.key] = SchemaService.createValue(schemaItem)
                }
            }

            for (let n = 0; n < diff.removed.length; n++) {
                const schemaItem = diff.removed[n]
                for (let m = 0; m < asset.data.length; m++) {
                    delete asset.data[m][schemaItem.key]
                }
            }

            for (let n = 0; n < diff.changed.length; n++) {
                const schemaItem = diff.changed[n]
                for (let m = 0; m < asset.data.length; m++) {
                    asset.data[m][schemaItem.key] = SchemaService.createValue(schemaItem)
                }
            }

            for (let prevKey in diff.renamed) {
                const newKey = diff.renamed[prevKey]
                for (let m = 0; m < asset.data.length; m++) {
                    const value = asset.data[m][prevKey]
                    asset.data[m][newKey] = value
                    delete asset.data[m][prevKey]
                }
            }
        },

        removeRow(state, action: PayloadAction<AssetItemIndex>) {
            if (!state) {
                return
            }
            const asset = state.data[action.payload.assetId]
            asset.data.splice(action.payload.index, 1)
        },

        editRow(state, action: PayloadAction<AssetItemValue>) {
            if (!state) {
                return
            }
            const asset = state.data[action.payload.assetId]
            const item = asset.data[action.payload.index]
            item[action.payload.key] = action.payload.value
        },
    },
})

export const store = ProjectStore.reducer

export default ProjectStore.actions
