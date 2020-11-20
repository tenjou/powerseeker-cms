import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../app/RootReducer"
import { addRow, editRow, removeRow } from "../features/sheet/SheetSlice"
import { DataEntry } from "../Types"
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
    data: DataEntry[]
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
                                            shemaEntry.id as keyof DataEntry
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
    const { data: sheetData } = useSelector((state: RootState) => state.sheet)

    const handleAdd = () => {
        dispatch(addRow())
    }

    const handleRemove = (index: number) => {
        dispatch(removeRow(index))
    }

    const handleChange = (index: number, key: string, value: string) => {
        dispatch(
            editRow({
                index,
                key,
                value,
            })
        )
    }

    if (!sheetData) {
        return <h1>No sheet data</h1>
    }

    return (
        <ViewContainerBody>
            <button onClick={handleAdd}>Add</button>
            <Sheet
                schema={schema}
                data={sheetData}
                onEntryRemove={handleRemove}
                onEntryChange={handleChange}
            />
        </ViewContainerBody>
    )
}

export default ViewContainer
