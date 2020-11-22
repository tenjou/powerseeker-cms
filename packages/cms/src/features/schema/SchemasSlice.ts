import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import { Schema } from "./Types"

type SchemaDictionary = Record<string, Schema>

type SchemaInput = {
    id: string
    schema: Schema
}

type InitialState = SchemaDictionary | null

const initialState: InitialState = null as InitialState

const schemasSlice = createSlice({
    name: "schemas",
    initialState,
    reducers: {
        load(state, action: PayloadAction<SchemaDictionary>) {
            return action.payload
        },

        unload() {
            return null
        },

        update(state, action: PayloadAction<SchemaInput>) {
            if (!state) {
                return
            }
            state[action.payload.id] = action.payload.schema
        },
    },
})

export const load = (dict: SchemaDictionary) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const schemas = getState().schemas
    if (schemas) {
        console.warn(`Schemas are already loaded`)
        return
    }

    dispatch(schemasSlice.actions.load(dict))
}

export const unload = (dict: SchemaDictionary) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const schemas = getState().schemas
    if (!schemas) {
        console.warn(`No schemas has been loaded`)
        return
    }

    dispatch(schemasSlice.actions.unload())
}

export const create = (id: string, schema: Schema) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const schemas = getState().schemas
    if (!schemas) {
        console.warn(`No schemas has been loaded`)
        return
    }

    dispatch(
        schemasSlice.actions.update({
            id,
            schema,
        })
    )
}

export default schemasSlice.reducer
