import { combineReducers } from "@reduxjs/toolkit"
import project from "./../features/project/ProjectSlice"
import { store as projects } from "../features/projects/ProjectsStore"
import state from "./../features/state/StateSlice"
import schemas from "../features/schema/SchemaStore"

const rootReducer = combineReducers({
    projects,
    project,
    state,
    schemas,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
