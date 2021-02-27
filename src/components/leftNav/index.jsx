import React, {Component} from "react"
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
  import { Menu } from 'antd';
  import {Link} from "react-router-dom"
  import logo from "../../assets/images/logo.png"
  import "./leftNav.less"
  const { SubMenu } = Menu;
  class LeftNav extends Component{
      render(){
          return(
              <div className="left-nav">
                    <Link to="/" className="logo left-nav-header">
                        <img src={logo} alt="logo"/>
                        <h1>硅谷后台</h1>
                    </Link>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                    </Menu>
              </div>
          )
             
      }
  }
  export default LeftNav