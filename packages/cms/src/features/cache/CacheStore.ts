import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import History from "../../app/History"

type InitialState = {
    selectedAssetId: string
}

const initialState: InitialState = {
    selectedAssetId: "",
}

const CacheStore = createSlice({
    name: "state",
    initialState,
    reducers: {
        selectAsset(state, action: PayloadAction<string>) {
            state.selectedAssetId = action.payload
        },
    },
})

export const store = CacheStore.reducer

export default CacheStore.actions
