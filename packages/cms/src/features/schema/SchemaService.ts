import _ from "lodash"
import { AssetItem } from "../../Types"
import { uuid4 } from "../../Utils"
import {
    Schema,
    SchemaItem,
    SchemaItemNumber,
    SchemaItemString,
    SchemaItemUUID,
    Schemas,
    SchemaDiff,
} from "./Types"
import SchemaStore from "./SchemaStore"
import store from "../../app/Store"

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

const edit = (schemaId: string) => {
    const schemas = store.getState().schemas
    if (!schemas) {
        return null
    }
    const schema = schemas[schemaId]
    const schemaNew = _.cloneDeep(schema)

    const schemaItem: SchemaItem = {
        id: uuid4(),
        key: Date.now() + "",
        type: "string",
        default: "str_value",
    }
    schemaNew.push(schemaItem)

    const schemaDiff = diff(schema, schemaNew)
    return schemaDiff
}

const diff = (schema: Schema, schemaNew: Schema) => {
    const schemaDiff: SchemaDiff = {
        added: [],
        removed: [],
        changed: {},
        schema: schemaNew,
    }

    for (let n = 0; n < schemaNew.length; n++) {
        const item = schemaNew[n]
        const itemPrev = schema.find((entry) => entry.id === item.id)
        if (!itemPrev) {
            schemaDiff.added.push(item)
        } else if (item === itemPrev) {
            if (item.type !== itemPrev.type) {
                schemaDiff.changed[item.id] = item
            }
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
    if (isNaN(value)) {
        value = 0
    }
    return Math.min(Math.max(value, schemaItem.min), schemaItem.max)
}

const processValueString = (schemaItem: SchemaItemString, value: string) => {
    return value
}

const processValueUUID = (schemaItem: SchemaItemUUID, value: string) => {
    return uuid4()
}

export default {
    load,
    unload,
    set,
    remove,
    edit,
    diff,
    createRow,
    createValue,
    processValue,
}
