import React from "react"
import styled from "styled-components"
import { Project } from "../Types"

const NavBarBody = styled.div`
    display: flex;
    flex: 0 0 40px;
    background-color: black;
    color: white;
    align-items: center;
    padding: 0 10px;
`
type NavBarProps = {
    project: Project
}
const NavBar = ({ project }: NavBarProps) => {
    return <NavBarBody>{project.meta.name}</NavBarBody>
}

export default NavBar
