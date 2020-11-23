import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProjectAsset, AssetItem, Project } from "../../Types"

type AssetItemIndex = {
    assetId: string
    index: number
}

type AddAssetItem = {
    assetId: string
    data: AssetItem
}

type AssetItemValue = AssetItemIndex & {
    key: string
    value: unknown
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

        addRow(state, action: PayloadAction<AddAssetItem>) {
            if (!state) {
                return
            }
            const asset = state.data[action.payload.assetId]
            asset.data.push(action.payload.data)
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
