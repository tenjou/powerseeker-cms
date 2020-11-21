import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import styled from "styled-components"
import LeftPanel from "./LeftPanel"
import NavBar from "../../components/NavBar"
import ViewContainer from "../../components/ViewContainer"
import { selectAsset } from "../state/StateSlice"
import * as ProjectSlice from "./ProjectSlice"
import { RootState } from "../../app/RootReducer"
import { Centered } from "../../components/Common"

type TProjectParams = {
    projectId: string
    assetId?: string | undefined
}
export default function Project({
    match,
}: RouteComponentProps<TProjectParams>) {
    const dispatch = useDispatch()
    const project = useSelector((state: RootState) => state.project)

    useEffect(() => {
        dispatch(ProjectSlice.load(match.params.projectId))
        dispatch(selectAsset(match.params.assetId || ""))
    }, [])

    if (!project) {
        return <Centered>Loading</Centered>
    }

    return (
        <Vertical>
            <NavBar project={project} />
            <Horizontal>
                <LeftPanel assets={project.data} />
                <ViewContainer />
            </Horizontal>
        </Vertical>
    )
}

const Vertical = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Horizontal = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`
