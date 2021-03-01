import React, { Component } from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';
import "./header.less"
export default class Header extends Component {
    state = {
        collapsed: false,
      };
      toggle = () => {
        const collapsed=!this.state.collapsed
        this.setState({
          collapsed,
        });
        this.props.collapsed(collapsed)
      };
    render() {
        return (
            <div className="header">   
                <div className="header-content">
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                    })}
                    <div className="header-top">
                        <span>欢迎，admin</span>
                        <a href="javascript;">退出</a>
                    </div>
                    
                </div>
                <div className="header-bottom">
                    <div className="title">
                        首页
                    </div>
                    <div className="time">
                        <span>2021-3-1 :22:00:00</span>
                        <img src="" alt=""/>
                        <span>晴</span>
                    </div>
                </div>
                
            </div>
        )
    }
}
