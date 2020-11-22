import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import { Schemas, Schema } from "./Types"

type SchemaInput = {
    id: string
    schema: Schema
}

type InitialState = Schemas | null

const initialState: InitialState = null as InitialState

const SchemaStore = createSlice({
    name: "schemas",
    initialState,
    reducers: {
        load(state, action: PayloadAction<Schemas>) {
            return action.payload
        },

        unload() {
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

export const load = (schemas: Schemas) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    if (getState().schemas) {
        console.warn(`Schemas are already loaded`)
        return
    }

    dispatch(SchemaStore.actions.load(schemas))
}

export const unload = (schemas: Schemas) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    if (!getState().schemas) {
        console.warn(`No schemas has been loaded`)
        return
    }

    dispatch(SchemaStore.actions.unload())
}

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
