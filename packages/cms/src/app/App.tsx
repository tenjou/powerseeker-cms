import React, { useEffect } from "react"
import styled from "styled-components"
import LeftPanel from "../components/LeftPanel"
import NavBar from "../components/NavBar"
import ViewContainer from "../components/ViewContainer"
import "./style.css"
import * as SheetSlice from "../features/sheet/SheetSlice"
import * as ProjectSlice from "../features/project/ProjectSlice"
import { useDispatch } from "react-redux"

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

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SheetSlice.load())
        dispatch(ProjectSlice.load())
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

export default App
