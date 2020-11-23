import store from "../../app/Store"
import PersistenceService from "../persistence/PersistenceService"
import ProjectsStore from "./ProjectsStore"

const load = () => {
    const projects = PersistenceService.getProjects()
    store.dispatch(ProjectsStore.load(projects))
}

const unload = () => {
    store.dispatch(ProjectsStore.unload())
}

const create = (name: string) => {
    const saveFile = PersistenceService.createProject(name)
    store.dispatch(
        ProjectsStore.add({
            meta: saveFile.meta,
            data: saveFile.data,
        })
    )
}

const remove = (projectId: string) => {
    PersistenceService.removeProject(projectId)
    store.dispatch(ProjectsStore.remove(projectId))
}

const rename = (projectId: string, name: string) => {
    const projects = store.getState().projects
    const project = projects[projectId]
    if (!project) {
        console.warn(`Failed to find project with Id: ${projectId}`)
        return
    }

    store.dispatch(
        ProjectsStore.rename({
            projectId,
            name,
        })
    )
    PersistenceService.updateProject(project.meta.id)
}

export default {
    load,
    unload,
    create,
    remove,
    rename,
}
