import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import { ProjectAsset, AssetItem, Project } from "../../Types"
import { createProjectFileId, uuid4 } from "./../../Utils"

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

const initialState: Project = {
    meta: {
        id: "",
        name: "",
        createdAt: 0,
        updatedAt: 0,
    },
    data: {},
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        load(state, action: PayloadAction<Project>) {
            return action.payload
        },

        addRow(state, action: PayloadAction<AddAssetItem>) {
            const asset = state.data[action.payload.assetId]
            asset.data.push(action.payload.data)
        },

        removeRow(state, action: PayloadAction<AssetItemIndex>) {
            const asset = state.data[action.payload.assetId]
            asset.data.splice(action.payload.index, 1)
        },

        editRow(state, action: PayloadAction<AssetItemValue>) {
            const asset = state.data[action.payload.assetId]
            const item = asset.data[action.payload.index]
            item[action.payload.key] = action.payload.value
        },
    },
})

export const load = (projectId: string) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const json = localStorage.getItem(createProjectFileId(projectId))
    if (!json) {
        console.warn(`Failed to load project with Id: ${projectId}`)
        return
    }

    const project = JSON.parse(json) as Project
    dispatch(projectSlice.actions.load(project))
}

export const addRow = () => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const assetId = getState().state.selectedAssetId
    dispatch(
        projectSlice.actions.addRow({
            assetId,
            data: {
                id: uuid4(),
                level: 1,
                name: Date.now().toString(),
            },
        })
    )
}

export const removeRow = (index: number) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const assetId = getState().state.selectedAssetId
    dispatch(
        projectSlice.actions.removeRow({
            assetId,
            index,
        })
    )
}

export const editRow = (index: number, key: string, value: unknown) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const assetId = getState().state.selectedAssetId
    dispatch(
        projectSlice.actions.editRow({
            assetId,
            index,
            key,
            value,
        })
    )
}

export default projectSlice.reducer
