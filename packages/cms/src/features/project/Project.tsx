import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import styled from "styled-components"
import LeftPanel from "../../components/LeftPanel"
import NavBar from "../../components/NavBar"
import ViewContainer from "../../components/ViewContainer"
import { selectAsset } from "../state/StateSlice"
import * as ProjectSlice from "./ProjectSlice"

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

type TProjectParams = {
    projectId: string
    assetId?: string | undefined
}
export default function Project({
    match,
}: RouteComponentProps<TProjectParams>) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ProjectSlice.load(match.params.projectId))
        dispatch(selectAsset(match.params.assetId || ""))
    }, [])

    return (
        <Vertical>
            <NavBar />
            <Horizontal>
                <LeftPanel />
                <ViewContainer />
            </Horizontal>
        </Vertical>
    )
}
