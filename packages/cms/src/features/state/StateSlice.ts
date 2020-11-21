import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import History from "./../../app/History"

type InitialState = {
    selectedAssetId: string
}

const initialState: InitialState = {
    selectedAssetId: "",
}

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        selectAsset(state, action: PayloadAction<string>) {
            state.selectedAssetId = action.payload
        },
    },
})

export const selectAsset = (assetId: string) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    if (!assetId) {
        return
    }

    const project = getState().project
    if (!project) {
        console.warn(`No project has been loaded`)
        return
    }

    if (!project.data[assetId]) {
        console.warn(`Invalid assetId: "${assetId}"`)
        return
    }
    dispatch(stateSlice.actions.selectAsset(assetId))
    History.push(`/project/${project.meta.id}/${assetId}`)
}

export default stateSlice.reducer
