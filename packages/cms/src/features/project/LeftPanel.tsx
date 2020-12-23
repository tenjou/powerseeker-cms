import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../../app/RootReducer"
import { Centered } from "../../components/Common"
import Editable from "../../components/Editable"
import { ProjectAsset } from "../../Types"
import CacheService from "../cache/CacheService"
import ProjectService from "./ProjectService"

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
    const selectedAssetId = useSelector((state: RootState) => state.cache.selectedAssetId)

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
            {assetsIds.map((assetId, index) => (
                <AssetLinkHolder key={assetId}>
                    <AssetLink className={selectedAssetId === assetId ? "active" : ""} onClick={() => CacheService.selectAsset(assetId)}>
                        <Editable value={assets[assetId].meta.name} onChange={(value) => ProjectService.renameAsset(assetId, value)} />
                    </AssetLink>
                    <button onClick={() => ProjectService.removeAsset(assetId)}>Remove</button>
                </AssetLinkHolder>
            ))}
        </LeftPanelBody>
    )
}

const LeftPanelHeader = () => (
    <div>
        <span>Assets</span>
        <button onClick={ProjectService.createAsset}>+</button>
    </div>
)

const AssetLinkHolder = styled.div`
    display: flex;
    cursor: pointer;

    &:hover {
        background-color: #efefef;
    }
    .active {
        background-color: #ccc;
    }
`

const AssetLink = styled.div`
    flex: 1;
    padding: 3px;
`

export default LeftPanel
