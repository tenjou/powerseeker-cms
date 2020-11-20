import { Action, ThunkAction } from "@reduxjs/toolkit"
import ConfigureStore from "./ConfigureStore"
import { RootState } from "./RootReducer"

const store = ConfigureStore()

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
