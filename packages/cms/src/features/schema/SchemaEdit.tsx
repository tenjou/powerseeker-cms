import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import history from "../../app/History"
import Editable from "../../components/Editable"
import ProjectService from "../project/ProjectService"
import SchemaService from "./SchemaService"
import { Schema, SchemaTypes } from "./Types"

interface SchemaEditProps {
    assetId: string
}
const SchemaEdit = ({ assetId }: SchemaEditProps) => {
    const [currentSchema, setCurrentSchema] = useState<Schema | null>(null)

    useEffect(() => {
        setCurrentSchema(SchemaService.clone(assetId))
    }, [assetId])

    if (!currentSchema) {
        return <h1>Loading</h1>
    }

    const handleAdd = () => {
        const schemaItemNew = SchemaService.createItem()
        const schemaNew = [...currentSchema, schemaItemNew]
        setCurrentSchema(schemaNew)
    }

    const handleCancel = () => {
        history.goBack()
    }

    const handleSave = () => {
        const schema = SchemaService.get(assetId)

        if (!schema || !currentSchema) {
            return
        }

        const schemaDiff = SchemaService.diff(schema, currentSchema)
        ProjectService.updateSchema(schemaDiff)

        const path = ProjectService.createPath(assetId)
        history.push(path)
    }

    const handleRemove = (index: number) => {
        const schemaNew = [...currentSchema]
        schemaNew.splice(index)

        setCurrentSchema(schemaNew)
    }

    const handleKeyChange = (index: number, value: string) => {
        const prevItem = currentSchema[index]

        const newSchema = [...currentSchema]
        newSchema[index] = { ...prevItem, key: value }

        setCurrentSchema(newSchema)
    }

    const handleTypeChange = (index: number, typeNew: string) => {}

    return (
        <SchemaEditContainer>
            <Toolbar>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </Toolbar>

            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {currentSchema.map((schemaItem, index) => (
                        <tr key={index}>
                            <td>
                                <Editable value={schemaItem.key} onChange={(value: string) => handleKeyChange(index, value)} />
                            </td>
                            <td>
                                <select value={schemaItem.type} onChange={(event) => handleTypeChange(index, event.currentTarget.value)}>
                                    {SchemaTypes.map((value, index) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleRemove(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SchemaEditContainer>
    )
}

const SchemaEditContainer = styled.div``

const Toolbar = styled.div``

export default SchemaEdit
