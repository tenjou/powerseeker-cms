import history from "../../app/History"
import store from "../../app/Store"
import { AssetItem, ProjectAsset } from "../../Types"
import { uuid4 } from "../../Utils"
import PersistenceService from "../persistence/PersistenceService"
import SchemaService from "../schema/SchemaService"
import ProjectStore from "./ProjectStore"

const load = (projectId: string) => {
    const saveFile = PersistenceService.load(projectId)
    if (!saveFile) {
        history.replace("/404")
        return
    }

    store.dispatch(
        ProjectStore.load({
            meta: saveFile.meta,
            data: saveFile.data,
        })
    )
    SchemaService.load(saveFile.schemas)
}

const unload = () => {
    store.dispatch(ProjectStore.unload())
    SchemaService.unload()
}

const createAsset = () => {
    const createdAt = Date.now()
    const newAsset: ProjectAsset = {
        meta: {
            id: uuid4(),
            name: "Untitled",
            createdAt,
            updatedAt: createdAt,
        },
        data: [],
    }

    store.dispatch(ProjectStore.addAsset(newAsset))

    SchemaService.add(newAsset.meta.id, [
        {
            id: "id",
            type: "uuid",
        },
        {
            id: "name",
            type: "string",
            default: "name",
        },
        {
            id: "level",
            type: "number",
            default: 1,
            min: 1,
            max: 99,
        },
    ])
    PersistenceService.updated()
}

const removeAsset = (assetId: string) => {
    const project = store.getState().project
    if (!project) {
        console.warn(`No project has been loaded`)
        return
    }

    const asset = project.data[assetId]
    if (!asset) {
        console.warn(`No such asset has been created with Id: ${assetId}`)
        return
    }

    store.dispatch(ProjectStore.removeAsset(assetId))

    SchemaService.remove(assetId)
    PersistenceService.updated()
}

const addRow = (data: AssetItem) => {
    const assetId = store.getState().cache.selectedAssetId
    if (!assetId) {
        console.warn(`No asset has been selected`)
        return
    }

    const project = store.getState().project
    if (!project) {
        console.warn(`No project has been loaded`)
        return
    }

    const asset = project.data[assetId]
    if (!asset) {
        console.warn(`No such asset has been created with Id: ${assetId}`)
        return
    }

    store.dispatch(
        ProjectStore.addRow({
            assetId,
            data,
        })
    )

    PersistenceService.updated()
}

const removeRow = (index: number) => {
    const assetId = store.getState().cache.selectedAssetId
    store.dispatch(
        ProjectStore.removeRow({
            assetId,
            index,
        })
    )

    PersistenceService.updated()
}

export const editRow = (index: number, key: string, value: unknown) => {
    const assetId = store.getState().cache.selectedAssetId
    store.dispatch(
        ProjectStore.editRow({
            assetId,
            index,
            key,
            value,
        })
    )

    PersistenceService.updated()
}

export default {
    load,
    unload,
    createAsset,
    removeAsset,
    addRow,
    removeRow,
    editRow,
}
