export type SchemaItemUUID = { type: "uuid" }
export type SchemaItemString = { type: "string"; default: string }
export type SchemaItemNumber = {
    type: "number"
    default: number
    min: number
    max: number
}

export type SchemaItemType =
    | SchemaItemUUID
    | SchemaItemString
    | SchemaItemNumber

export type SchemaItem = { id: string } & SchemaItemType

export type Schema = SchemaItem[]

export type Schemas = Record<string, Schema>
