import { configureStore } from "@reduxjs/toolkit"
import RootReducer from "./RootReducer"

export default function ConfigureStore() {
    return configureStore({
        reducer: RootReducer,
    })
}
