import styled from "styled-components"
import { Centered } from "../../components/Common"
import Editable from "../../components/Editable"
import { AssetItem, ProjectAsset, ProjectAssets } from "../../Types"
import SchemaService from "../schema/SchemaService"
import { Schema, SchemaItem, Schemas } from "../schema/Types"
import history from "./../../app/History"
import SchemaEdit from "./../schema/SchemaEdit"
import ProjectService, { ProjectAssetAction } from "./ProjectService"

type OnEntryChangeFunc = (index: number, key: string, value: string | boolean) => void

type SheetProps = {
    schema: Schema
    data: AssetItem[]
    onEntryRemove: (index: number) => void
    onEntryChange: OnEntryChangeFunc
}
const Sheet = ({ schema, data, onEntryRemove, onEntryChange }: SheetProps) => {
    return (
        <table>
            <thead>
                <tr>
                    {schema.map((entry) => (
                        <th key={entry.key}>{entry.key}</th>
                    ))}
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {data.map((assetItem, index) => (
                    <tr key={index}>
                        {schema.map((schemaItem) => (
                            <td key={schemaItem.key}>{renderCell(schemaItem, assetItem, onEntryChange, index)}</td>
                        ))}
                        <td>
                            <button onClick={() => onEntryRemove(index)}>Remove</button>
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
    assetActionType: ProjectAssetAction | ""
}
const ViewContainer = ({ assets, assetId, schemas, assetActionType }: ViewContainerProps) => {
    const asset = assets[assetId]
    const schema = schemas[assetId]

    const handleAdd = () => {
        const newRow = SchemaService.createRow(schema)
        ProjectService.addRow(newRow)
    }

    const handleRemove = (index: number) => {
        ProjectService.removeRow(index)
    }

    const handleChange = (index: number, key: string, value: string | boolean) => {
        const processedValue = SchemaService.processValue(schema, key, value)
        ProjectService.editRow(index, key, processedValue)
    }

    const handleEdit = () => {
        const path = ProjectService.createPath(assetId, "edit")
        history.push(path)
    }

    if (!asset) {
        return (
            <Centered>
                <div>No asset selected</div>
            </Centered>
        )
    }

    if (assetActionType && assetActionType === "edit") {
        return (
            <ViewContainerBody>
                <SchemaEdit assetId={assetId} />
            </ViewContainerBody>
        )
    }

    return (
        <ViewContainerBody>
            <Toolbar>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleEdit}>Edit </button>
            </Toolbar>

            <Sheet schema={schema} data={asset.data} onEntryRemove={handleRemove} onEntryChange={handleChange} />
        </ViewContainerBody>
    )
}

const ViewContainerBody = styled.div`
    flex: 1;
    background-color: #fff;
`

const Toolbar = styled.div``

const renderCell = (schemaItem: SchemaItem, assetItem: AssetItem, onEntryChange: OnEntryChangeFunc, index: number) => {
    switch (schemaItem.type) {
        case "number":
            return (
                <input
                    type="number"
                    value={assetItem[schemaItem.key as keyof ProjectAsset] + ""}
                    min={schemaItem.min}
                    max={schemaItem.max}
                    onChange={(event) => onEntryChange(index, schemaItem.key, event.currentTarget.value)}
                />
            )

        case "boolean":
            return (
                <input
                    type="checkbox"
                    checked={!!assetItem[schemaItem.key as keyof ProjectAsset]}
                    onChange={(event) => onEntryChange(index, schemaItem.key, event.currentTarget.checked)}
                />
            )

        case "string":
            return (
                <Editable
                    value={assetItem[schemaItem.key as keyof ProjectAsset] + ""}
                    onChange={(value) => onEntryChange(index, schemaItem.key, value)}
                />
            )

        case "enum":
            return (
                <select
                    value={assetItem[schemaItem.key as keyof ProjectAsset] + ""}
                    onChange={(event) => onEntryChange(index, schemaItem.key, event.currentTarget.value)}
                >
                    {schemaItem.values.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            )

        case "uuid":
            return <div>{assetItem[schemaItem.key as keyof ProjectAsset] + ""}</div>

        default:
            return null
    }
}

export default ViewContainer
