import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"
import styled from "styled-components"
import LeftPanel from "../components/LeftPanel"
import NavBar from "../components/NavBar"
import ViewContainer from "../components/ViewContainer"
import * as ProjectSlice from "../features/project/ProjectSlice"
import * as SheetSlice from "../features/sheet/SheetSlice"
import { selectAsset } from "./../features/state/StateSlice"
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

const Project = () => {
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

    useEffect(() => {
        dispatch(SheetSlice.load())
        dispatch(ProjectSlice.load())
        dispatch(selectAsset("sdads"))
    }, [])

    return (
        <Switch>
            <Route path="/project" component={Project} />
            <Route path="/404" component={Page404} />
            <Redirect from="/" exact to="/project" />
            <Redirect to="/404" />
        </Switch>
    )
}

export default App
