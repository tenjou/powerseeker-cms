import { combineReducers } from "@reduxjs/toolkit"
import sheet from "../features/sheet/SheetSlice"

const rootReducer = combineReducers({
    sheet,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
