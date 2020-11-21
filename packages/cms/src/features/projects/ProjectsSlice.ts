import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/RootReducer"
import { AppDispatch } from "../../app/Store"
import { Project } from "../../Types"
import { uuid4 } from "../../Utils"

const initialState: Record<string, Project> = {}

const projectsSlice = createSlice({
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
    },
})

export const load = () => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const projects: Record<string, Project> = {}
    const projectIds = Object.keys(localStorage)

    for (let n = 0; n < projectIds.length; n++) {
        const projectId = projectIds[n]
        if (projectId[0] !== "@") {
            continue
        }

        const json = localStorage.getItem(projectId)
        if (!json) {
            console.warn(`Could not load project with Id: ${projectId}`)
            continue
        }

        const project = JSON.parse(json) as Project
        projects[projectId.slice(1)] = project
    }

    dispatch(projectsSlice.actions.load(projects))
}

export const unload = () => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    dispatch(projectsSlice.actions.unload())
}

export const create = (name: string = "Project") => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    const createdAt = Date.now()
    const project: Project = {
        meta: {
            id: uuid4(),
            name: name + "_" + Date.now(),
            createdAt,
            updatedAt: createdAt,
        },
        data: {},
    }

    localStorage.setItem(
        createProjectFileId(project.meta.id),
        JSON.stringify(project)
    )

    dispatch(projectsSlice.actions.create(project))
}

export const remove = (project: Project) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    localStorage.removeItem(createProjectFileId(project.meta.id))

    dispatch(projectsSlice.actions.remove(project))
}

export const update = (project: Project) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    localStorage.setItem(
        createProjectFileId(project.meta.id),
        JSON.stringify(project)
    )

    dispatch(projectsSlice.actions.update(project))
}

export const save = (project: Project) => (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    localStorage.setItem(
        createProjectFileId(project.meta.id),
        JSON.stringify(project)
    )
}

const createProjectFileId = (id: string) => `@${id}`

export default projectsSlice.reducer
