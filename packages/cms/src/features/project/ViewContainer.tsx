import React from "react"
import styled from "styled-components"
import { AssetItem, ProjectAsset, ProjectAssets } from "../../Types"
import { Centered } from "../../components/Common"
import Editable from "../../components/Editable"
import SchemaService from "../schema/SchemaService"
import { Schemas, Schema } from "../schema/Types"
import ProjectService from "./ProjectService"

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
    assetId: string
    schemas: Schemas
}
const ViewContainer = ({ assets, assetId, schemas }: ViewContainerProps) => {
    const asset = assets[assetId]
    const schema = schemas[assetId]

    const handleAdd = () => {
        const newRow = SchemaService.createRow(schema)
        ProjectService.addRow(newRow)
    }

    const handleRemove = (index: number) => {
        ProjectService.removeRow(index)
    }

    const handleChange = (index: number, key: string, value: string) => {
        const processedValue = SchemaService.processValue(schema, key, value)
        ProjectService.editRow(index, key, processedValue)
    }

    const handleSchemaItem = () => {
        SchemaService.edit(assetId)
    }

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
