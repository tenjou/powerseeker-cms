import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Schemas, Schema } from "./Types"

type SchemaInput = {
    id: string
    schema: Schema
}

type InitialState = Schemas | null

const initialState = null as InitialState

const SchemaStore = createSlice({
    name: "schemas",
    initialState,
    reducers: {
        load(state, action: PayloadAction<Schemas>) {
            if (state) {
                console.warn(`Schemas are already loaded`)
                return
            }
            return action.payload
        },

        unload(state) {
            if (!state) {
                console.warn(`No schemas has been loaded`)
                return
            }
            return null
        },

        set(state, action: PayloadAction<SchemaInput>) {
            if (!state) {
                return
            }
            state[action.payload.id] = action.payload.schema
        },

        remove(state, action: PayloadAction<string>) {
            if (!state) {
                return
            }
            delete state[action.payload]
        },
    },
})

export const store = SchemaStore.reducer

export default SchemaStore.actions
