import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { Centered } from "../../components/Common"
import { ProjectAsset } from "../../Types"
import * as State from "../state/StateSlice"
import * as ProjectSlice from "./ProjectSlice"

const LeftPanelBody = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 240px;
    background-color: #fff;
    border-right: 1px solid #e5e5e5;
`

type LeftPanelProps = {
    assets: Record<string, ProjectAsset>
}
const LeftPanel = ({ assets }: LeftPanelProps) => {
    const dispatch = useDispatch()

    const handleRemoveAsset = (assetId: string) => {
        dispatch(ProjectSlice.removeAsset(assetId))
    }

    const handleClick = (assetId: string) => {
        dispatch(State.selectAsset(assetId))
    }

    const assetsIds = Object.keys(assets)
    if (assetsIds.length === 0) {
        return (
            <LeftPanelBody>
                <LeftPanelHeader />
                <Centered>No assets created</Centered>
            </LeftPanelBody>
        )
    }

    return (
        <LeftPanelBody>
            <LeftPanelHeader />
            {assetsIds.map((assetId) => (
                <div key={assetId}>
                    <button onClick={() => handleClick(assetId)}>
                        {assets[assetId].name}
                    </button>
                    <button onClick={() => handleRemoveAsset(assetId)}>
                        Remove
                    </button>
                </div>
            ))}
        </LeftPanelBody>
    )
}

const LeftPanelHeader = () => {
    const dispatch = useDispatch()

    const handleCreateAsset = () => {
        dispatch(ProjectSlice.createAsset())
    }

    return (
        <div>
            <span>Assets</span>
            <button onClick={handleCreateAsset}>+</button>
        </div>
    )
}

export default LeftPanel
