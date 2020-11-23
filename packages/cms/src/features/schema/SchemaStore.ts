import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
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

export const { load, unload } = SchemaStore.actions

export const add = (id: string, schema: Schema) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    if (!getState().schemas) {
        console.warn(`No schemas has been loaded`)
        return
    }

    dispatch(
        SchemaStore.actions.set({
            id,
            schema,
        })
    )
}

export const remove = (id: string) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const schemas = getState().schemas
    if (!schemas) {
        console.warn(`No schemas has been loaded`)
        return
    }

    if (!schemas[id]) {
        console.warn(`Failed to find schema with Id: ${id}`)
        return
    }

    dispatch(SchemaStore.actions.remove(id))
}

export default SchemaStore.reducer
