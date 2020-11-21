import React from "react"
import styled from "styled-components"

const NavBarBody = styled.div`
    display: flex;
    flex: 0 0 40px;
    background-color: black;
    color: white;
    align-items: center;
    padding: 0 10px;
`

const NavBar = () => {
    return <NavBarBody>PowerSeeker</NavBarBody>
}

export default NavBar
