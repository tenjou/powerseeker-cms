import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"

type InitialState = {
    selectedAsset: string
}

const initialState: InitialState = {
    selectedAsset: "",
}

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        selectAsset(state, action: PayloadAction<string>) {
            state.selectedAsset = action.payload
        },
    },
})

export const selectAsset = (assetId: string) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const assets = getState().project.data
    if (!assets[assetId]) {
        console.warn(`Invalid assetId: "${assetId}"`)
        return
    }
    dispatch(stateSlice.actions.selectAsset(assetId))
}

export default stateSlice.reducer
