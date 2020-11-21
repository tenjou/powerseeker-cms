import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { RootState } from "../app/RootReducer"
import * as State from "../features/state/StateSlice"

const LeftPanelBody = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 240px;
    background-color: #fff;
    border-right: 1px solid #e5e5e5;
`

const LeftPanel = () => {
    const dispatch = useDispatch()
    const assets = useSelector((state: RootState) => state.project.data)

    const handleClick = (assetId: string) => {
        dispatch(State.selectAsset(assetId))
    }

    return (
        <LeftPanelBody>
            {Object.keys(assets).map((assetId) => (
                <div key={assetId}>
                    <button onClick={() => handleClick(assetId)}>
                        {assets[assetId].name}
                    </button>
                </div>
            ))}
        </LeftPanelBody>
    )
}

export default LeftPanel
