import _ from "lodash"
import store from "../../app/Store"
import { AssetItem } from "../../Types"
import { uuid4 } from "../../Utils"
import SchemaStore from "./SchemaStore"
import {
    Schema,
    SchemaDiff,
    SchemaItem,
    SchemaItemBoolean,
    SchemaItemEnum,
    SchemaItemNumber,
    SchemaItemString,
    SchemaItemUUID,
    Schemas,
} from "./Types"

const load = (schemas: Schemas) => {
    store.dispatch(SchemaStore.load(schemas))
}

const unload = () => {
    store.dispatch(SchemaStore.unload())
}

const set = (id: string, schema: Schema) => {
    if (!store.getState().schemas) {
        console.warn(`No schemas has been loaded`)
        return
    }

    store.dispatch(
        SchemaStore.set({
            id,
            schema,
        })
    )
}

const get = (schemaId: string) => {
    const schemas = store.getState().schemas
    if (!schemas) {
        return null
    }

    const schema = schemas[schemaId]
    return schema || null
}

const remove = (id: string) => {
    const schemas = store.getState().schemas
    if (!schemas) {
        console.warn(`No schemas has been loaded`)
        return
    }

    if (!schemas[id]) {
        console.warn(`Failed to find schema with Id: ${id}`)
        return
    }

    store.dispatch(SchemaStore.remove(id))
}

const clone = (schemaId: string) => {
    const schema = get(schemaId)
    if (!schema) {
        return null
    }

    const schemaNew = _.cloneDeep(schema)
    return schemaNew
}

const diff = (schema: Schema, schemaNew: Schema) => {
    const schemaDiff: SchemaDiff = {
        added: [],
        removed: [],
        changed: {},
        renamed: {},
        schema: schemaNew,
    }

    for (let n = 0; n < schemaNew.length; n++) {
        const item = schemaNew[n]
        const itemPrev = schema.find((entry) => entry.id === item.id)
        if (itemPrev) {
            if (item.type !== itemPrev.type) {
                schemaDiff.changed[item.id] = item
            }
            if (item.key !== itemPrev.key) {
                schemaDiff.renamed[itemPrev.key] = item.key
            }
        } else {
            schemaDiff.added.push(item)
        }
    }

    // Check if previous keys exists in the new schema
    for (let n = 0; n < schema.length; n++) {
        const itemPrev = schema[n]
        const item = schemaNew.find((entry) => entry.id === itemPrev.id)
        if (!item) {
            schemaDiff.removed.push(itemPrev)
        }
    }

    return schemaDiff
}

const createItem = () => {
    const schemaItem: SchemaItem = {
        id: uuid4(),
        key: Date.now() + "",
        type: "string",
        default: "str_value",
    }
    return schemaItem
}

const createRow = (schema: Schema) => {
    const row: AssetItem = {}

    for (let n = 0; n < schema.length; n++) {
        const item = schema[n]
        row[item.key] = createValue(item)
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
    const schemaItem = schema.find((item) => item.key === key)
    if (!schemaItem) {
        console.warn(`Failed to find item with a key in the schema: ${key}`)
        return null
    }

    switch (schemaItem.type) {
        case "number": {
            if (typeof value === "string") {
                return processValueNumber(schemaItem, parseInt(value))
            }
            if (typeof value === "number") {
                return processValueNumber(schemaItem, value)
            }
            console.warn(`Unhandled type: ${typeof value}, for: ${schemaItem.type}`)
            return 0
        }

        case "boolean": {
            if (typeof value === "string" || typeof value === "number") {
                return processValueBoolean(schemaItem, !!value)
            }
            if (typeof value === "boolean") {
                return processValueBoolean(schemaItem, value)
            }
            console.warn(`Unhandled type: ${typeof value}, for: ${schemaItem.type}`)
            return 0
        }

        case "string": {
            if (typeof value === "string") {
                return processValueString(schemaItem, value)
            }
            console.warn(`Unhandled type: ${typeof value}, for: ${schemaItem.type}`)
            return ""
        }

        case "enum": {
            if (typeof value === "string") {
                return processValueEnum(schemaItem, value)
            }
            return value
        }

        case "uuid": {
            if (typeof value === "string") {
                return processValueUUID(schemaItem, value)
            }
            console.warn(`Unhandled type: ${typeof value}, for: ${schemaItem.type}`)
            return uuid4()
        }
    }
}

const processValueNumber = (schemaItem: SchemaItemNumber, value: number) => {
    if (Number.isNaN(value)) {
        value = 0
    }
    return Math.min(Math.max(value, schemaItem.min), schemaItem.max)
}

const processValueBoolean = (schemaItem: SchemaItemBoolean, value: boolean) => {
    if (Number.isNaN(value)) {
        value = false
    }
    return value
}

const processValueString = (schemaItem: SchemaItemString, value: string) => {
    return value
}

const processValueEnum = (schemaItem: SchemaItemEnum, value: string) => {
    if (schemaItem.values.indexOf(value) === -1) {
        return schemaItem.values[0] || ""
    }
    return value
}

const processValueUUID = (schemaItem: SchemaItemUUID, value: string) => {
    return uuid4()
}

export default {
    load,
    unload,
    set,
    get,
    remove,
    clone,
    diff,
    createItem,
    createRow,
    createValue,
    processValue,
}
