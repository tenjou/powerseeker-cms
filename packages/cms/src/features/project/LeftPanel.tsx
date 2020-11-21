import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
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

    const handleCreateAsset = () => {
        dispatch(ProjectSlice.createAsset())
    }

    const handleRemoveAsset = (assetId: string) => {
        dispatch(ProjectSlice.removeAsset(assetId))
    }

    const handleClick = (assetId: string) => {
        dispatch(State.selectAsset(assetId))
    }

    return (
        <LeftPanelBody>
            <div>
                <span>Assets</span>
                <button onClick={handleCreateAsset}>+</button>
            </div>
            {Object.keys(assets).map((assetId) => (
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

export default LeftPanel
