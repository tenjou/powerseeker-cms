import { Project, ProjectAssets, ProjectMeta } from "../../Types"
import { Schemas } from "../schema/Types"
import store from "../../app/Store"
import { uuid4 } from "../../Utils"

const state = {
    needSave: false,
}

type ProjectSaveFile = {
    meta: ProjectMeta
    data: ProjectAssets
    schemas: Schemas
}

const save = () => {
    const project = store.getState().project
    const schemas = store.getState().schemas

    if (!project || !schemas) {
        console.warn(`No project is loaded`)
        return
    }

    const saveFile: ProjectSaveFile = {
        meta: project.meta,
        data: project.data,
        schemas,
    }

    localStorage.setItem(
        createProjectFileId(project.meta.id),
        JSON.stringify(saveFile)
    )

    console.log("(Saved)")
}

const load = (projectId: string) => {
    const json = localStorage.getItem(createProjectFileId(projectId))
    if (!json) {
        console.warn(`Could not find project save file: ${projectId}`)
        return null
    }

    const saveFile = JSON.parse(json) as ProjectSaveFile
    return saveFile
}

const getProjects = () => {
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

    return projects
}

const createProject = (name: string) => {
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

    return project
}

const removeProject = (projectId: string) => {
    localStorage.removeItem(createProjectFileId(projectId))
}

const updateProject = (projectId: string) => {
    const project = store.getState().projects[projectId]

    localStorage.setItem(
        createProjectFileId(project.meta.id),
        JSON.stringify(project)
    )
}

const createProjectFileId = (id: string) => `@${id}`

const updated = () => {
    state.needSave = true
}

setInterval(() => {
    if (state.needSave) {
        state.needSave = false
        save()
    }
})

export default {
    load,
    updated,
    getProjects,
    createProject,
    removeProject,
    updateProject,
}
