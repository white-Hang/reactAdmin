import React, { Component } from 'react'
import loadable from 'react-loadable'
import {Switch,Route,Redirect} from "react-router-dom"
import Loading from "../../components/loading"
// import ProductHome from "./home"
// import ProductDetail from "./detail"
// import ProductAddUpdate from "./add-update"
import "./index.less"
const ProductHome = loadable({
    loader:()=>import("./home"),
    loading:Loading
    //Loading组件是自己写的组件
  })
const ProductDetail = loadable({
    loader:()=>import("./detail"),
    loading:Loading
    //Loading组件是自己写的组件
})
const ProductAddUpdate = loadable({
    loader:()=>import("./add-update"),
    loading:Loading
    //Loading组件是自己写的组件
})
export default class Product extends Component {
    render() {
        return (
            <Switch>   
                <Route path="/product" component={ProductHome} exact></Route>
                <Route path="/product/detail" component={ProductDetail}></Route>
                <Route path="/product/addupdate" component={ProductAddUpdate}></Route>
                <Redirect to="/product"/>
            </Switch>
        )
    }
}
