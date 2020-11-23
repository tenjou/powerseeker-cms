import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import { ProjectAsset, AssetItem, Project } from "../../Types"
import { uuid4 } from "./../../Utils"
import { Schema } from "../schema/Types"
import * as SchemaStore from "../schema/SchemaStore"
import PersistenceService from "../persistence/PersistenceService"

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

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        load(state, action: PayloadAction<Project>) {
            return action.payload
        },

        unload() {
            return null
        },

        createAsset(state, action: PayloadAction<ProjectAsset>) {
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

export const { load, unload } = projectSlice.actions

export const createAsset = (schema: Schema) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const createdAt = Date.now()
    const newAsset: ProjectAsset = {
        meta: {
            id: uuid4(),
            name: "Untitled",
            createdAt,
            updatedAt: createdAt,
        },
        data: [],
    }

    dispatch(projectSlice.actions.createAsset(newAsset))
    dispatch(SchemaStore.add(newAsset.meta.id, schema))

    PersistenceService.updated()
}

export const removeAsset = (assetId: string) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const project = getState().project
    if (!project) {
        console.warn(`No project has been loaded`)
        return
    }

    const asset = project.data[assetId]
    if (!asset) {
        console.warn(`No such asset has been created with Id: ${assetId}`)
        return
    }

    dispatch(projectSlice.actions.removeAsset(assetId))

    PersistenceService.updated()
}

export const addRow = (data: AssetItem) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const assetId = getState().state.selectedAssetId
    if (!assetId) {
        console.warn(`No asset has been selected`)
        return
    }

    const project = getState().project
    if (!project) {
        console.warn(`No project has been loaded`)
        return
    }

    const asset = project.data[assetId]
    if (!asset) {
        console.warn(`No such asset has been created with Id: ${assetId}`)
        return
    }

    dispatch(
        projectSlice.actions.addRow({
            assetId,
            data,
        })
    )

    PersistenceService.updated()
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

    PersistenceService.updated()
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

    PersistenceService.updated()
}

export default projectSlice.reducer
