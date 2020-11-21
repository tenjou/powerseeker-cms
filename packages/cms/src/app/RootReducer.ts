import { combineReducers } from "@reduxjs/toolkit"
import project from "./../features/project/ProjectSlice"
import state from "./../features/state/StateSlice"
import schema from "./../features/schema/SchemaSlice"

const rootReducer = combineReducers({
    project,
    state,
    schema,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
