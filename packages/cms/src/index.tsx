import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
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
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
)
