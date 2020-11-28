import { Redirect, Route, Switch } from "react-router-dom"
import Export from "../features/export/Export"
import Project from "../features/project/Project"
import Projects from "../features/projects/Projects"
import "./style.css"

const Page404 = () => {
    return <h1>404</h1>
}

const App = () => {
    return (
        <Switch>
            <Route path="/project/:projectId/:assetId?" component={Project} />
            <Route path="/export" component={Export} />
            <Route path="/404" component={Page404} />
            <Route path="/" exact={true} component={Projects} />
            <Redirect from="*" to="/404" />
        </Switch>
    )
}

export default App
