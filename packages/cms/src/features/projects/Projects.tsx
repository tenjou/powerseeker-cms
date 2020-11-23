import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { RootState } from "../../app/RootReducer"
import Editable from "../../components/Editable"
import { Project } from "../../Types"
import * as ProjectsSlice from "./ProjectsStore"

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

        return () => {
            dispatch(ProjectsSlice.unload())
        }
    }, [])

    const handleOpen = (projectId: string) => {
        history.push(`/project/${projectId}`)
    }

    const handleRemove = (project: Project) => {
        dispatch(ProjectsSlice.remove(project))
    }

    const handleNameChange = (projectId: string, name: string) => {
        dispatch(ProjectsSlice.rename(projectId, name))
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
                        <ProjectItem key={projectId}>
                            <span onClick={() => handleOpen(projectId)}>
                                <Editable
                                    value={projects[projectId].meta.name}
                                    placeholder="Project name"
                                    useRightClick={true}
                                    onChange={(name) =>
                                        handleNameChange(projectId, name)
                                    }
                                />
                            </span>
                            <button
                                onClick={() =>
                                    handleRemove(projects[projectId])
                                }
                            >
                                Remove
                            </button>
                        </ProjectItem>
                    ))}
                </ul>
            </div>
        </>
    )
}

const ProjectItem = styled.li`
    display: flex;
    padding: 5px;
`
