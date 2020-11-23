import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import styled from "styled-components"
import { RootState } from "../../app/RootReducer"
import { Centered } from "../../components/Common"
import NavBar from "../../components/NavBar"
import CacheService from "../cache/CacheService"
import LeftPanel from "./LeftPanel"
import ProjectService from "./ProjectService"
import ViewContainer from "./ViewContainer"

type TProjectParams = {
    projectId: string
    assetId?: string | undefined
}
export default function Project({
    match,
}: RouteComponentProps<TProjectParams>) {
    const project = useSelector((state: RootState) => state.project)
    const schemas = useSelector((state: RootState) => state.schemas)
    const assetId = match.params.assetId || ""

    useEffect(() => {
        ProjectService.load(match.params.projectId)
        CacheService.selectAsset(assetId)

        return () => {
            ProjectService.unload()
        }
    }, [])

    if (!project || !schemas) {
        return <Centered>Loading</Centered>
    }

    return (
        <Vertical>
            <NavBar project={project} />
            <Horizontal>
                <LeftPanel assets={project.data} />
                <ViewContainer
                    assets={project.data}
                    assetId={assetId}
                    schemas={schemas}
                />
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
