import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Project } from "../../Types"

type ProjectRenameInput = {
    projectId: string
    name: string
}

type Projects = Record<string, Project>

const initialState: Projects = {}

const ProjectsStore = createSlice({
    name: "projects",
    initialState,
    reducers: {
        load(state, action: PayloadAction<Record<string, Project>>) {
            return action.payload
        },

        unload(state) {
            return {}
        },

        add(state, action: PayloadAction<Project>) {
            state[action.payload.meta.id] = action.payload
        },

        remove(state, action: PayloadAction<string>) {
            delete state[action.payload]
        },

        update(state, action: PayloadAction<Project>) {
            state[action.payload.meta.id] = action.payload
        },

        rename(state, action: PayloadAction<ProjectRenameInput>) {
            const project = state[action.payload.projectId]
            project.meta.name = action.payload.name
            project.meta.updatedAt = Date.now()
        },
    },
})

export const store = ProjectsStore.reducer

export default ProjectsStore.actions
