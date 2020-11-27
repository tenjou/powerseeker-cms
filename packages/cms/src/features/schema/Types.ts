export interface SchemaItemUUID {
    type: "uuid"
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

export type SchemaItemType =
    | SchemaItemUUID
    | SchemaItemString
    | SchemaItemNumber

export type SchemaItem = { id: string; key: string } & SchemaItemType

export type SchemaType = SchemaItemType["type"]

export type Schema = SchemaItem[]

export type Schemas = Record<string, Schema>
