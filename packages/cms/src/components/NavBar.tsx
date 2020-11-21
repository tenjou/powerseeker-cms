import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../app/RootReducer"

const NavBarBody = styled.div`
    display: flex;
    flex: 0 0 40px;
    background-color: black;
    color: white;
    align-items: center;
    padding: 0 10px;
`

const NavBar = () => {
    const project = useSelector((state: RootState) => state.project)

    return <NavBarBody>{project.meta.name}</NavBarBody>
}

export default NavBar
