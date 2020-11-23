import { combineReducers } from "@reduxjs/toolkit"
import { store as project } from "../features/project/ProjectStore"
import { store as projects } from "../features/projects/ProjectsStore"
import state from "./../features/state/StateSlice"
import { store as schemas } from "../features/schema/SchemaStore"

const rootReducer = combineReducers({
    projects,
    project,
    state,
    schemas,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
