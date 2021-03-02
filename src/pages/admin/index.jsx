import React, { Component,lazy,Suspense } from 'react'
import {Redirect, Route , Switch} from "react-router-dom"
import memoryUtils from "../../utils/memoryUtils"
import { Layout} from 'antd';
import loadable from 'react-loadable' //另一种路由懒加载
import "./admin.css"
import LeftNav from "../../components/leftNav"
import Header from "../../components/header"
import Loading from "../../components/loading"
import Home from "../home"
import Category from "../category"
import Product from "../product"
import Role from "../role"
import User from "../user"
import Bar from "../charts/bar"
import Line from "../charts/line"
import Pie from "../charts/pie"
import Order from "../order"
//路由懒加载写法
// const Home=lazy(()=> import ("../home"))
// const Category=lazy(()=> import ("../category"))
// const Product=lazy(()=> import ("../product"))
// const Role=lazy(()=> import ("../role"))
// const User=lazy(()=> import ("../user"))
// const Bar=lazy(()=> import ("../charts/bar"))
// const Line=lazy(()=> import ("../charts/line"))
// const Pie=lazy(()=> import ("../charts/pie"))
// const Order=lazy(()=> import ("../order"))
//路由懒加载另一种写法
// const Home = loadable({
//   loader:()=>import("../home"),
//   loading:Loading
//   //Loading组件是自己写的组件
// })
// const Category = loadable({
//   loader:()=>import("../category"),
//   loading:Loading
//   //Loading组件是自己写的组件
// })
// const Product = loadable({
//   loader:()=>import("../product"),
//   loading:Loading
//   //Loading组件是自己写的组件
// })
// const Role = loadable({
//   loader:()=>import("../role"),
//   loading:Loading
//   //Loading组件是自己写的组件
// })
// const User = loadable({
//   loader:()=>import("../user"),
//   loading:Loading
//   //Loading组件是自己写的组件
// })
// const Bar = loadable({
//   loader:()=>import("../charts/bar"),
//   loading:Loading
//   //Loading组件是自己写的组件
// })
// const Line = loadable({
//   loader:()=>import("../charts/line"),
//   loading:Loading
//   //Loading组件是自己写的组件
// })
// const Pie = loadable({
//   loader:()=>import("../charts/pie"),
//   loading:Loading
//   //Loading组件是自己写的组件
// })
// const Order = loadable({
//   loader:()=>import("../order"),
//   loading:Loading
//   //Loading组件是自己写的组件
// })
const {  Sider, Content, Footer } = Layout;
export default class Admin extends Component {
  state = {
    collapsed: false,
  };
  collapsed=(flag)=>{
    this.setState({
      collapsed:flag
    });
  }
    render() {
        const user =memoryUtils.user
        if(!user||!user._id){
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{minHeight:"100%"}}>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <LeftNav/>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} collapsed={this.collapsed}/>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
             {/* <Suspense fallback={<Loading/>}> */}
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path="/product" component={Product}/>
                <Route path="/role" component={Role}/>
                <Route path="/user" component={User}/>
                <Route path="/charts/bar" component={Bar}/>
                <Route path="/charts/line" component={Line}/>
                <Route path="/charts/Pie" component={Pie}/>
                <Route path="/order" component={Order}/>
                <Redirect to="/home"/> 
              </Switch>
              {/* </Suspense> */}
              </Content>
              <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
          </Layout>
        )
    }
}
