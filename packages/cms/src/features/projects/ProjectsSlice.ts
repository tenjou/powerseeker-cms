import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import { Project } from "../../Types"

const initialState: Project[] = []

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        load() {},
    },
})

export const load = () => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const projects = Object.keys(localStorage)
    dispatch(projectsSlice.actions.load())
}

export default projectsSlice.reducer
