import { combineReducers } from "@reduxjs/toolkit"
import sheet from "../features/sheet/SheetSlice"
import project from "./../features/project/ProjectSlice"

const rootReducer = combineReducers({
    sheet,
    project,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
