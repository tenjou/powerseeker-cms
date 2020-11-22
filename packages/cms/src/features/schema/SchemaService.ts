import { AssetItem } from "../../Types"
import { uuid4 } from "../../Utils"
import {
    Schema,
    SchemaItem,
    SchemaItemNumber,
    SchemaItemString,
    SchemaItemUUID,
} from "./Types"

const createRow = (schema: Schema) => {
    const row: AssetItem = {}

    for (let n = 0; n < schema.length; n++) {
        const item = schema[n]
        row[item.id] = createValue(item)
    }

    return row
}

const createValue = (schemaItem: SchemaItem) => {
    switch (schemaItem.type) {
        case "number":
            return processValueNumber(schemaItem, schemaItem.default)
        case "string":
            return processValueString(schemaItem, schemaItem.default)
        case "uuid":
            return processValueUUID(schemaItem, uuid4())
    }
}

const processValue = (schema: Schema, key: string, value: unknown) => {
    const schemaItem = schema.find((item) => item.id === key)
    if (!schemaItem) {
        console.warn(`Failed to find item with a key in the schema: ${key}`)
        return null
    }

    switch (schemaItem.type) {
        case "number": {
            if (typeof value === "string") {
                return processValueNumber(schemaItem, parseInt(value))
            }
            console.warn(
                `Unhandled type: ${typeof value}, for: ${schemaItem.type}`
            )
            return 0
        }

        case "string": {
            if (typeof value === "string") {
                return processValueString(schemaItem, value)
            }
            console.warn(
                `Unhandled type: ${typeof value}, for: ${schemaItem.type}`
            )
            return ""
        }

        case "uuid": {
            if (typeof value === "string") {
                return processValueUUID(schemaItem, value)
            }
            console.warn(
                `Unhandled type: ${typeof value}, for: ${schemaItem.type}`
            )
            return uuid4()
        }
    }
}

const processValueNumber = (schemaItem: SchemaItemNumber, value: number) => {
    return Math.min(Math.max(value, schemaItem.min), schemaItem.max)
}

const processValueString = (schemaItem: SchemaItemString, value: string) => {
    return value
}

const processValueUUID = (schemaItem: SchemaItemUUID, value: string) => {
    return uuid4()
}

export default {
    createRow,
    createValue,
    processValue,
}
