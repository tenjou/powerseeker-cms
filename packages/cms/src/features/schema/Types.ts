export interface SchemaItemUUID {
    type: "uuid"
}
export interface SchemaItemUID {
    type: "uid"
    default: string
}
export interface SchemaItemString {
    type: "string"
    default: string
}
export interface SchemaItemNumber {
    type: "number"
    default: number
    min: number
    max: number
}
export interface SchemaItemBoolean {
    type: "boolean"
    default: boolean
}
export interface SchemaItemEnum {
    type: "enum"
    values: string[]
    default: string
}

export type SchemaItemType = SchemaItemUUID | SchemaItemUID | SchemaItemString | SchemaItemNumber | SchemaItemBoolean | SchemaItemEnum

export type SchemaItem = { id: string; key: string } & SchemaItemType

export type SchemaType = SchemaItemType["type"]

export const SchemaTypes: SchemaType[] = ["boolean", "enum", "number", "string", "uuid", "uid"]

export type Schema = SchemaItem[]

export type Schemas = Record<string, Schema>

export type SchemaDiff = {
    added: SchemaItem[]
    removed: SchemaItem[]
    changed: SchemaItem[]
    renamed: Record<string, string>
    schema: Schema
}
