import React, { useEffect, useState } from "react"
import styled from "styled-components"
import history from "../../app/History"
import Editable from "../../components/Editable"
import ProjectService from "../project/ProjectService"
import SchemaService from "./SchemaService"
import { Schema, SchemaType, SchemaTypes } from "./Types"

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

    const handleKeyChange = (index: number, id: string, value: unknown) => {
        const prevItem = currentSchema[index]

        const newSchema = [...currentSchema]
        newSchema[index] = { ...prevItem, [id]: value }

        setCurrentSchema(newSchema)
    }

    const handleTypeChange = (index: number, typeNew: SchemaType) => {
        const prevItem = currentSchema[index]

        const newSchema = [...currentSchema]
        newSchema[index] = SchemaService.createItem(typeNew, prevItem)

        setCurrentSchema(newSchema)
    }

    return (
        <SchemaEditContainer>
            <Toolbar>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </Toolbar>

            <Table>
                <TableHeader>
                    <TableHeaderItem>Key</TableHeaderItem>
                    <TableHeaderItem>Type</TableHeaderItem>
                    <TableHeaderItem></TableHeaderItem>
                </TableHeader>

                <TableBody>
                    {currentSchema.map((schemaItem, index) => (
                        <TableItem key={index}>
                            <Fields>
                                <Field>
                                    <Editable value={schemaItem.key} onChange={(value: string) => handleKeyChange(index, "key", value)} />
                                </Field>
                                <Field>
                                    <select
                                        value={schemaItem.type}
                                        onChange={(event) => handleTypeChange(index, event.currentTarget.value as SchemaType)}
                                    >
                                        {SchemaTypes.map((value, index) => (
                                            <option key={index} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <Field>
                                    <button onClick={() => handleRemove(index)}>Remove</button>
                                </Field>
                            </Fields>

                            {schemaItem.type === "number" && (
                                <Extension>
                                    <SettingNumber index={index} id="min" value={schemaItem.min} onChange={handleKeyChange} />
                                    <SettingNumber index={index} id="max" value={schemaItem.max} onChange={handleKeyChange} />
                                    <SettingNumber index={index} id="default" value={schemaItem.default} onChange={handleKeyChange} />
                                </Extension>
                            )}
                            {schemaItem.type === "boolean" && (
                                <Extension>
                                    <SettingBoolean index={index} id="default" value={schemaItem.default} onChange={handleKeyChange} />
                                </Extension>
                            )}
                            {(schemaItem.type === "string" || schemaItem.type === "uid") && (
                                <Extension>
                                    <SettingString index={index} id="default" value={schemaItem.default} onChange={handleKeyChange} />
                                </Extension>
                            )}
                            {schemaItem.type === "enum" && (
                                <Extension>
                                    <SettingEnum
                                        index={index}
                                        id="default"
                                        value={schemaItem.default}
                                        values={schemaItem.values}
                                        onChange={handleKeyChange}
                                    />
                                </Extension>
                            )}
                        </TableItem>
                    ))}
                </TableBody>
            </Table>
        </SchemaEditContainer>
    )
}

interface SettingNumberProps {
    index: number
    id: string
    value: number
    onChange: (index: number, id: string, value: string) => void
}
const SettingNumber = ({ index, id, value, onChange }: SettingNumberProps) => {
    return (
        <SettingHolder>
            <SettingKey>{id}</SettingKey>
            <SettingValue>
                <input type="number" value={value} onChange={(event) => onChange(index, id, event.currentTarget.value)} />
            </SettingValue>
        </SettingHolder>
    )
}

interface SettingBooleanProps {
    index: number
    id: string
    value: boolean
    onChange: (index: number, id: string, value: boolean) => void
}
const SettingBoolean = ({ index, id, value, onChange }: SettingBooleanProps) => {
    return (
        <SettingHolder>
            <SettingKey>{id}</SettingKey>
            <SettingValue>
                <input type="checkbox" checked={value} onChange={(event) => onChange(index, id, event.currentTarget.checked)} />
            </SettingValue>
        </SettingHolder>
    )
}

interface SettingStringProps {
    index: number
    id: string
    value: string
    onChange: (index: number, id: string, value: string) => void
}
const SettingString = ({ index, id, value, onChange }: SettingStringProps) => {
    return (
        <SettingHolder>
            <SettingKey>{id}</SettingKey>
            <SettingValue>
                <input value={value} onChange={(event) => onChange(index, id, event.currentTarget.value)} />
            </SettingValue>
        </SettingHolder>
    )
}

interface SettingEnumProps {
    index: number
    id: string
    value: string
    values: string[]
    onChange: (index: number, id: string, value: string) => void
}
const SettingEnum = ({ index, id, value, values, onChange }: SettingEnumProps) => {
    return (
        <SettingHolder>
            <SettingKey>{id}</SettingKey>
            <SettingValue>
                <select value={value} onChange={(event) => onChange(index, id, event.currentTarget.value)}>
                    {values.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </SettingValue>
        </SettingHolder>
    )
}

const SettingHolder = styled.div`
    display: flex;
    flex: 1;
`

const SettingKey = styled.div`
    flex: 1;
`

const SettingValue = styled.div`
    flex: 1;
`

const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 10px;
`

const TableHeader = styled.div`
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
`

const TableHeaderItem = styled.div`
    flex: 1;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
`

const TableBody = styled.div`
    display: flex;
    flex-direction: column;
`

const TableItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    border-bottom: 1px solid #ddd;
    padding: 5px 0;
`

const Fields = styled.div`
    display: flex;
    flex: 1;
    padding: 5px 0;
`

const Field = styled.div`
    flex: 1;
`

const Extension = styled.div`
    margin-left: 10px;
`

const SchemaEditContainer = styled.div``

const Toolbar = styled.div``

export default SchemaEdit
