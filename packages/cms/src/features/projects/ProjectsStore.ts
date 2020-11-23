import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import { Project } from "../../Types"
import PersistenceService from "../persistence/PersistenceService"

type ProjectRenameInput = {
    projectId: string
    name: string
}

const initialState: Record<string, Project> = {}

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

        create(state, action: PayloadAction<Project>) {
            state[action.payload.meta.id] = action.payload
        },

        remove(state, action: PayloadAction<Project>) {
            delete state[action.payload.meta.id]
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

export const { unload } = ProjectsStore.actions

export const load = () => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const projects = PersistenceService.getProjects()
    dispatch(ProjectsStore.actions.load(projects))
}

export const create = (name: string = "Project") => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const project = PersistenceService.createProject(name)
    dispatch(ProjectsStore.actions.create(project))
}

export const remove = (project: Project) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    PersistenceService.removeProject(project.meta.id)
    dispatch(ProjectsStore.actions.remove(project))
}

export const update = (project: Project) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    dispatch(ProjectsStore.actions.update(project))
    PersistenceService.updateProject(project.meta.id)
}

export const rename = (projectId: string, name: string) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const projects = getState().projects
    const project = projects[projectId]
    if (!project) {
        console.warn(`Failed to find project with Id: ${projectId}`)
        return
    }

    dispatch(
        ProjectsStore.actions.rename({
            projectId,
            name,
        })
    )
    PersistenceService.updateProject(project.meta.id)
}

export default ProjectsStore.reducer
