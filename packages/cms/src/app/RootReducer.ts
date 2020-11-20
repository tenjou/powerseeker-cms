import { combineReducers } from "@reduxjs/toolkit"
import sheet from "../features/sheet/SheetSlice"
import project from "./../features/project/ProjectSlice"
import state from "./../features/state/StateSlice"

const rootReducer = combineReducers({
    sheet,
    project,
    state,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
