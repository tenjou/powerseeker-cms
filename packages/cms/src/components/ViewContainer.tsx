import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../app/RootReducer"
import * as Project from "../features/project/ProjectSlice"
import { AssetItem, ProjectAsset } from "../Types"
import Editable from "./Editable"

type SchemaEntry = {
    id: string
    type: string
}
const schema: SchemaEntry[] = [
    {
        id: "id",
        type: "number",
    },
    {
        id: "name",
        type: "string",
    },
    {
        id: "level",
        type: "number",
    },
]

const ViewContainerBody = styled.div`
    flex: 1;
    background-color: #fff;
`

type SheetProps = {
    schema: SchemaEntry[]
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

const ViewContainer = () => {
    const dispatch = useDispatch()
    const { selectedAssetId } = useSelector((state: RootState) => state.state)
    const asset = useSelector((state: RootState) =>
        state.project ? state.project.data[selectedAssetId] : null
    )

    const handleAdd = () => {
        dispatch(Project.addRow())
    }

    const handleRemove = (index: number) => {
        dispatch(Project.removeRow(index))
    }

    const handleChange = (index: number, key: string, value: string) => {
        dispatch(Project.editRow(index, key, value))
    }

    if (!asset) {
        return <h1>No asset selected</h1>
    }

    return (
        <ViewContainerBody>
            <button onClick={handleAdd}>Add</button>
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
