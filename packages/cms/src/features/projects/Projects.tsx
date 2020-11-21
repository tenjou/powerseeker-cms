import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../app/RootReducer"
import { Project } from "../../Types"
import * as ProjectsSlice from "./ProjectsSlice"

export default function Projects() {
    const dispatch = useDispatch()
    const projects = useSelector((state: RootState) => state.projects)

    useEffect(() => {
        dispatch(ProjectsSlice.load())
    }, [])

    const handleCreate = () => {
        dispatch(ProjectsSlice.create())
    }

    const handleRemove = (project: Project) => {
        dispatch(ProjectsSlice.remove(project))
    }

    return (
        <>
            <div>
                <h1>Projects</h1>
                <button onClick={handleCreate}>Create</button>
            </div>
            <div>
                <ul>
                    {Object.keys(projects).map((projectId) => (
                        <li key={projectId}>
                            {projects[projectId].meta.name}
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
