import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import type { RouteComponentProps } from "react-router-dom"
import styled from "styled-components"
import type { RootState } from "../../app/RootReducer"
import { Centered } from "../../components/Common"
import NavBar from "../../components/NavBar"
import CacheService from "../cache/CacheService"
import Export from "../export/Export"
import LeftPanel from "./LeftPanel"
import type { ProjectAction, ProjectAssetAction } from "./ProjectService"
import ProjectService from "./ProjectService"
import ViewContainer from "./ViewContainer"

type TProjectParams = {
    projectId: string
    actionType?: ProjectAction
    assetId?: string | undefined
    assetActionType?: ProjectAssetAction
}
export default function Project({ match }: RouteComponentProps<TProjectParams>) {
    const project = useSelector((state: RootState) => state.project)
    const schemas = useSelector((state: RootState) => state.schemas)

    const actionType = match.params.actionType || ""
    const assetId = match.params.assetId || ""
    const assetActionType = match.params.assetActionType || ""

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

    if (actionType === "export") {
        return (
            <Vertical>
                <NavBar project={project} />
                <Horizontal>
                    <Export project={project} />
                </Horizontal>
            </Vertical>
        )
    }

    return (
        <Vertical>
            <NavBar project={project} />
            <Horizontal>
                <LeftPanel assets={project.data} />
                <ViewContainer assets={project.data} assetId={assetId} schemas={schemas} assetActionType={assetActionType} />
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
    overflow: auto;
`

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
    align-items: center;
    background: #000000c9;
`
