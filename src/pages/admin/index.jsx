import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import memoryUtils from "../../utils/memoryUtils"
import { Layout} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import "./admin.css"
import LeftNav from "../../components/leftNav"
const { Header, Sider, Content, Footer } = Layout;
export default class Admin extends Component {
    state = {
        collapsed: false,
      };
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
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
              <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                })}
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                Content
              </Content>
              <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
          </Layout>
        )
    }
}
