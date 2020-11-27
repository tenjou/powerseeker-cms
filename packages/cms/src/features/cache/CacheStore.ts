import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
