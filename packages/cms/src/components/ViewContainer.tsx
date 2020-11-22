import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../app/RootReducer"
import * as Project from "../features/project/ProjectSlice"
import { AssetItem, ProjectAsset, ProjectAssets } from "../Types"
import { Centered } from "./Common"
import Editable from "./Editable"
import SchemaService from "../features/schema/SchemaService"
import { Schemas, Schema } from "../features/schema/Types"

const ViewContainerBody = styled.div`
    flex: 1;
    background-color: #fff;
`

type SheetProps = {
    schema: Schema
    data: AssetItem[]
    onEntryRemove: (index: number) => void
    onEntryChange: (index: number, key: string, value: string) => void
}
const Sheet = ({ schema, data, onEntryRemove, onEntryChange }: SheetProps) => {
    return (
        <table>
            <thead>
                <tr>
                    {schema.map((entry) => (
                        <th key={entry.id}>{entry.id}</th>
                    ))}
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {data.map((dataEntry, index) => (
                    <tr key={"tr" + dataEntry.id}>
                        {schema.map((shemaEntry) => (
                            <td key={shemaEntry.id}>
                                <Editable
                                    value={
                                        dataEntry[
                                            shemaEntry.id as keyof ProjectAsset
                                        ]
                                    }
                                    placeholder="stuff"
                                    onChange={(value) =>
                                        onEntryChange(
                                            index,
                                            shemaEntry.id,
                                            value
                                        )
                                    }
                                />
                            </td>
                        ))}
                        <td>
                            <button onClick={() => onEntryRemove(index)}>
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

type ViewContainerProps = {
    assets: ProjectAssets
    schemas: Schemas
}
const ViewContainer = ({ assets, schemas }: ViewContainerProps) => {
    const dispatch = useDispatch()
    const { selectedAssetId } = useSelector((state: RootState) => state.state)

    const asset = assets[selectedAssetId]
    const schema = schemas[selectedAssetId]

    const handleAdd = () => {
        const newRow = SchemaService.createRow(schema)
        dispatch(Project.addRow(newRow))
    }

    const handleRemove = (index: number) => {
        dispatch(Project.removeRow(index))
    }

    const handleChange = (index: number, key: string, value: string) => {
        const processedValue = SchemaService.processValue(schema, key, value)
        dispatch(Project.editRow(index, key, processedValue))
    }

    const handleSchemaItem = () => {}

    if (!asset) {
        return (
            <Centered>
                <div>No asset selected</div>
            </Centered>
        )
    }

    return (
        <ViewContainerBody>
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleSchemaItem}>AddSchemaItem</button>
            <Sheet
                schema={schema}
                data={asset.data}
                onEntryRemove={handleRemove}
                onEntryChange={handleChange}
            />
        </ViewContainerBody>
    )
}

export default ViewContainer
