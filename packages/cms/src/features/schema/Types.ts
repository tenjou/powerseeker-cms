export type SchemaItem = SchemaItemType & {
    id: string
}

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

export type Schema = SchemaItem[]
