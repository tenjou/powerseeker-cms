import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../app/RootReducer"

const LeftPanelBody = styled.div`
    display: flex;
    flex: 0 0 240px;
    background-color: #fff;
    border-right: 1px solid #e5e5e5;
`

const LeftPanel = () => {
    const assets = useSelector((state: RootState) => state.project.data)
    return (
        <LeftPanelBody>
            {Object.keys(assets).map((assetId) => (
                <div key={assetId}>{assets[assetId].name}</div>
            ))}
        </LeftPanelBody>
    )
}

export default LeftPanel
