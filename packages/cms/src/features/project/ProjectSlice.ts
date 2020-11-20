import { createSlice } from "@reduxjs/toolkit"
import { ProjectAsset } from "../../Types"
import { uuid4 } from "./../../Utils"

type ProjectInitialState = {
    meta: {
        id: string
        name: string
        createdAt: number
        updatedAt: number
    }
    data: Record<string, ProjectAsset>
}

const initialState: ProjectInitialState = {
    meta: {
        id: "",
        name: "",
        createdAt: 0,
        updatedAt: 0,
    },
    data: {},
}

const createAsset = (name: string): ProjectAsset => ({
    id: uuid4(),
    name,
    data: {},
})

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        load(state) {
            const createdAt = Date.now()
            const assetA = createAsset("assetA")
            const assetB = createAsset("assetB")

            state.meta = {
                id: uuid4(),
                name: "Project",
                createdAt,
                updatedAt: createdAt,
            }
            state.data = {
                [assetA.id]: assetA,
                [assetB.id]: assetB,
            }
        },
    },
})

export const { load } = projectSlice.actions

export default projectSlice.reducer
