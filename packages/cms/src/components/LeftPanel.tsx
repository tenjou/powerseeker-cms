import React from "react"
import ReactDOM from "react"
import styled from "styled-components"

const LeftPanelBody = styled.div`
    display: flex;
    flex: 0 0 240px;
    background-color: #fff;
    border-right: 1px solid #e5e5e5;
`

const LeftPanel = () => {
    return <LeftPanelBody>NavBar</LeftPanelBody>
}

export default LeftPanel
