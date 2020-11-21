import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { RootState } from "../../app/RootReducer"
import { Project } from "../../Types"
import * as ProjectsSlice from "./ProjectsSlice"

const ProjectsHeader = () => {
    const dispatch = useDispatch()

    const handleCreate = () => {
        dispatch(ProjectsSlice.create())
    }

    return (
        <div>
            <h1>Projects</h1>
            <button onClick={handleCreate}>Create</button>
        </div>
    )
}

export default function Projects() {
    const dispatch = useDispatch()
    const history = useHistory()
    const projects = useSelector((state: RootState) => state.projects)
    const projectsIds = Object.keys(projects)

    useEffect(() => {
        dispatch(ProjectsSlice.load())
    }, [])

    const handleOpen = (projectId: string) => {
        history.push(`/project/${projectId}`)
    }

    const handleRemove = (project: Project) => {
        dispatch(ProjectsSlice.remove(project))
    }

    if (projectsIds.length === 0) {
        return (
            <>
                <ProjectsHeader />
                <div>No projects</div>
            </>
        )
    }

    return (
        <>
            <ProjectsHeader />
            <div>
                <ul>
                    {projectsIds.map((projectId) => (
                        <li key={projectId}>
                            <button onClick={() => handleOpen(projectId)}>
                                {projects[projectId].meta.name}
                            </button>
                            <button
                                onClick={() =>
                                    handleRemove(projects[projectId])
                                }
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
