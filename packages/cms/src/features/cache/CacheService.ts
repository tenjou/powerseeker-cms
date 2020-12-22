import CacheStore from "./CacheStore"
import store from "../../app/Store"
import history from "../../app/History"

const selectAsset = (assetId: string) => {
    if (!assetId) {
        return
    }

    const project = store.getState().project
    if (!project) {
        console.warn(`No project has been loaded`)
        return
    }

    if (!project.data[assetId]) {
        console.warn(`Invalid assetId: "${assetId}"`)
        return
    }

    store.dispatch(CacheStore.selectAsset(assetId))
    history.push(`/project/${project.meta.id}/asset/${assetId}`)
}

export default { selectAsset }
