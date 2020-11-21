import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"

type SchemaKeyType = "string" | "number"

type Schema = {
    [key: string]: {
        type: SchemaKeyType
        default: unknown
    }
}

const initialState: Record<string, Schema> = {}

const schemaSlice = createSlice({
    name: "schema",
    initialState,
    reducers: {
        update(state, action: PayloadAction<SchemaInput>) {
            state[action.payload.id] = action.payload.schema
        },
    },
})

export const create = (id: string, schema: Schema) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    dispatch(
        schemaSlice.actions.update({
            id,
            schema,
        })
    )
}

type SchemaInput = {
    id: string
    schema: Schema
}

export default schemaSlice.reducer
