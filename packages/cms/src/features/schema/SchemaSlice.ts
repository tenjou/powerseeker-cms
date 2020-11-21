import { createSlice } from "@reduxjs/toolkit"

type Schema = {}

const initialState: Record<string, Schema> = {}

const schemaSlice = createSlice({
    name: "schema",
    initialState,
    reducers: {},
})

export default schemaSlice.reducer
