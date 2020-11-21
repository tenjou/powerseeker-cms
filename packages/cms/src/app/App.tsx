import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Route, Switch, RouteComponentProps } from "react-router-dom"
import styled from "styled-components"
import LeftPanel from "../components/LeftPanel"
import NavBar from "../components/NavBar"
import ViewContainer from "../components/ViewContainer"
import * as ProjectSlice from "../features/project/ProjectSlice"
import { selectAsset } from "./../features/state/StateSlice"
import { RootState } from "./RootReducer"
import "./style.css"

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

const Projects = () => {
    return <h1>Projects</h1>
}

type TProjectParams = {
    assetId?: string | undefined
}
const Project = ({ match }: RouteComponentProps<TProjectParams>) => {
    const dispatch = useDispatch()

    useEffect(() => {
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

const Page404 = () => {
    return <h1>404</h1>
}

const App = () => {
    const dispatch = useDispatch()
    const project = useSelector((state: RootState) => state.project)

    useEffect(() => {
        dispatch(ProjectSlice.load())
    }, [])

    if (!project.meta.id) {
        return null
    }

    return (
        <Switch>
            <Route path="/project/:assetId?" component={Project} />
            <Route path="/404" component={Page404} />
            <Route path="/" component={Projects} />
            <Redirect to="/404" />
        </Switch>
    )
}

export default App
