import React from "react"
import ReactDom from "react-dom"

import App from "./App"
import memoryUtils from "./utils/memoryUtils"
import store from "./utils/storageUtil"
// 读取local中保存user, 保存到内存中
const user = store.getUser()
memoryUtils.user = user
ReactDom.render(
    <App/>,
    document.getElementById("root")
)