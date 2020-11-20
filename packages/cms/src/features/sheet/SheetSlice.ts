import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DataEntry } from "../../Types"

export type SheetRowEdit = {
    index: number
    key: string
    value: string
}

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

        editRow(state, action: PayloadAction<SheetRowEdit>) {
            const entry = state.data[action.payload.index]
            const key = action.payload.key as keyof DataEntry
            entry[key] = action.payload.value
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

export const { load, addRow, removeRow, editRow } = slice.actions

export default slice.reducer
