import { combineReducers } from "@reduxjs/toolkit"
import project from "./../features/project/ProjectSlice"
import state from "./../features/state/StateSlice"

const rootReducer = combineReducers({
    project,
    state,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
