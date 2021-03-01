import React, { Component } from 'react'
import {Redirect, Route , Switch} from "react-router-dom"
import memoryUtils from "../../utils/memoryUtils"
import { Layout} from 'antd';

import "./admin.css"
import LeftNav from "../../components/leftNav"
import Header from "../../components/header"
import Home from "../home"
import Category from "../category"
import Product from "../product"
import Role from "../role"
import User from "../user"
import Bar from "../charts/bar"
import Line from "../charts/line"
import Pie from "../charts/pie"
import Order from "../order"
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
              </Content>
              <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
          </Layout>
        )
    }
}
