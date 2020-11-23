import { combineReducers } from "@reduxjs/toolkit"
import { store as project } from "../features/project/ProjectStore"
import { store as projects } from "../features/projects/ProjectsStore"
import { store as cache } from "../features/cache/CacheStore"
import { store as schemas } from "../features/schema/SchemaStore"

const rootReducer = combineReducers({
    projects,
    project,
    cache,
    schemas,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
