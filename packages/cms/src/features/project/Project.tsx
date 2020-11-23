import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import styled from "styled-components"
import { RootState } from "../../app/RootReducer"
import { Centered } from "../../components/Common"
import NavBar from "../../components/NavBar"
import PersistenceService from "../persistence/PersistenceService"
import { selectAsset } from "../state/StateSlice"
import * as SchemaStore from "./../schema/SchemaStore"
import LeftPanel from "./LeftPanel"
import * as ProjectSlice from "./ProjectSlice"
import ViewContainer from "./ViewContainer"

type TProjectParams = {
    projectId: string
    assetId?: string | undefined
}
export default function Project({
    match,
    history,
}: RouteComponentProps<TProjectParams>) {
    const dispatch = useDispatch()
    const project = useSelector((state: RootState) => state.project)
    const schemas = useSelector((state: RootState) => state.schemas)

    useEffect(() => {
        const saveFile = PersistenceService.load(match.params.projectId)
        if (!saveFile) {
            history.replace("/404")
            return
        }

        dispatch(
            ProjectSlice.load({
                meta: saveFile.meta,
                data: saveFile.data,
            })
        )
        dispatch(SchemaStore.load(saveFile.schemas))
        // dispatch(selectAsset(match.params.assetId || ""))

        // return () => {
        //     dispatch(ProjectSlice.unload())
        //     dispatch(SchemaStore.unload())
        // }
    }, [])

    return <Centered>Loading</Centered>
    // if (!project || !schemas) {
    //     return <Centered>Loading</Centered>
    // }

    // return (
    //     <Vertical>
    //         <NavBar project={project} />
    //         {/* <Horizontal>
    //             <LeftPanel assets={project.data} />
    //             <ViewContainer assets={project.data} schemas={schemas} />
    //         </Horizontal> */}
    //     </Vertical>
    // )
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
