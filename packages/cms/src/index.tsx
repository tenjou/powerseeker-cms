import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"
import App from "./app/App"
import store from "./app/Store"
import History from "./app/History"

declare global {
    interface Window {
        clipboardData: {
            getData: (type: string) => string
        }
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={History}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("app")
)
