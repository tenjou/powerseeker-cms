import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import { ProjectAsset, AssetItem, Project } from "../../Types"
import { uuid4 } from "./../../Utils"

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

const createAsset = (id: string, name: string): ProjectAsset => ({
    id,
    name,
    data: [],
})

const addItem = (asset: ProjectAsset, data: AssetItem) => {
    asset.data.push(data)
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        load(state) {
            // const createdAt = Date.now()
            // const assetA = createAsset("1", "assetA")
            // addItem(assetA, {
            //     id: uuid4(),
            //     name: "monster_a",
            //     level: 1,
            // })
            // addItem(assetA, {
            //     id: uuid4(),
            //     name: "monster_b",
            //     level: 5,
            // })
            // const assetB = createAsset("2", "assetB")
            // state.meta = {
            //     id: uuid4(),
            //     name: "Project",
            //     createdAt,
            //     updatedAt: createdAt,
            // }
            // state.data = {
            //     [assetA.id]: assetA,
            //     [assetB.id]: assetB,
            // }
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

export const { load } = projectSlice.actions

export const createProject = () => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {}

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
