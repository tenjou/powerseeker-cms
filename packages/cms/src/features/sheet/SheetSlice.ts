import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DataEntry } from "../../Types"

type SheetInitialState = {
    data: DataEntry[]
}

const initialState: SheetInitialState = {
    data: [],
}

const slice = createSlice({
    name: "sheet",
    initialState,
    reducers: {
        load(state) {
            state.data = [
                {
                    id: 1,
                    name: "monster_a",
                    level: 1,
                },
                {
                    id: 2,
                    name: "monster_b",
                    level: 5,
                },
            ]
        },

        addRow(state) {
            state.data.push(createDataEntry())
        },

        removeRow(state, action: PayloadAction<number>) {
            state.data.splice(action.payload, 1)
        },
    },
})

const createDataEntry = (): DataEntry => {
    return {
        id: Date.now(),
        level: 1,
        name: Date.now().toString(),
    }
}

export const { load, addRow, removeRow } = slice.actions

export default slice.reducer
