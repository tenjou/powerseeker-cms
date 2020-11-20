import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./app/App"
import store from "./app/Store"

declare global {
    interface Window {
        clipboardData: {
            getData: (type: string) => string
        }
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
)
