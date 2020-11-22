import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import { ProjectAsset, AssetItem, Project } from "../../Types"
import { createProjectFileId, uuid4 } from "./../../Utils"
import history from "./../../app/History"

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

export const load = (projectId: string) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const json = localStorage.getItem(createProjectFileId(projectId))
    if (!json) {
        console.warn(`Failed to load project with Id: ${projectId}`)
        history.replace("/404")
        return
    }

    const project = JSON.parse(json) as Project
    dispatch(projectSlice.actions.load(project))
}

export const unload = () => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    dispatch(projectSlice.actions.unload())
}

export const save = () => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const project = getState().project
    if (!project) {
        console.warn(`No project has been loaded yet`)
        return
    }

    localStorage.setItem(
        createProjectFileId(project.meta.id),
        JSON.stringify(project)
    )
    console.log("(Saved)")
}

export const createAsset = (name: string = "Untitled") => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const createdAt = Date.now()
    const newAsset: ProjectAsset = {
        meta: {
            id: uuid4(),
            name,
            createdAt,
            updatedAt: createdAt,
        },
        data: [],
    }

    dispatch(projectSlice.actions.createAsset(newAsset))
    // dispatch(Schema.create(newAsset.meta.id))
    dispatch(save())
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
    dispatch(save())
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
    dispatch(save())
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
    dispatch(save())
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
    dispatch(save())
}

export default projectSlice.reducer
