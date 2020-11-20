import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../app/RootReducer"
import { addRow, removeRow } from "../features/sheet/SheetSlice"
import { DataEntry } from "../Types"

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
}
const Sheet = ({ schema, data, onEntryRemove }: SheetProps) => {
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
                                {dataEntry[shemaEntry.id as keyof DataEntry]}
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
            />
        </ViewContainerBody>
    )
}

export default ViewContainer
