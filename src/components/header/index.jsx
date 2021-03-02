import React, { Component } from 'react'
import moment from "moment"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ExclamationCircleOutlined
  } from '@ant-design/icons';
import {Modal} from "antd"
import {withRouter} from "react-router-dom"
import {reWeather} from "../../api/index"
import "./header.less"
import memoryUtils from "../../utils/memoryUtils"
import store from "../../utils/storageUtil"
import menuList from '../../config/menuConfig'
class Header extends Component {
    state = {
        collapsed: false,
        currentTime:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        weather:"",
        dayPictureUrl:"",
      };
      //
      toggle = () => {
        const collapsed=!this.state.collapsed
        this.setState({
          collapsed,
        });
        this.props.collapsed(collapsed)
      };
      //获取时间
      getTime=()=>{
        this.time=setInterval(()=>{
            const currentTime= moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            this.setState({
                currentTime
            }) 
          },1000)
      }
      //获取天气
      getWeather=async()=>{
        // 调取异步接口获取数据
        const {dayPictureUrl,weather} =await reWeather("南京")
        this.setState({
            dayPictureUrl,
            weather
        })
      }
      //退出登录
      loginOut=()=>{
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定退出吗?',
            onOk:()=> {
                memoryUtils.user={}
                store.remoteUser()
                this.props.history.replace('/login')
            }
          });    
      }
      //获取当前页面名称
      getTitle=(menuList)=>{
        const path=this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key===path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
                title = item.title
            } else if (item.children) {
                // 在所有子item中查找匹配的
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                // 如果有值才说明有匹配的
                if(cItem) {
                // 取出它的title
                title = cItem.title
                }
            }
        })
            return title
      }
      // 不能这么做: 不会更新显示
    //   componentWillMount(){
    //     // this.title=this.getTitle(menuList)
    //   }
      componentDidMount(){
          this.getTime()
          this.getWeather()
      }
      componentWillUnmount(){
          clearInterval(this.time)
      }
    render() {
        const {currentTime,dayPictureUrl,weather}=this.state
        const username = memoryUtils.user.username
        const title=this.getTitle(menuList)
        return (
            <div className="header">   
                <div className="header-content">
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                    })}
                    <div className="header-top">
                        <span>欢迎，{username}</span>
                        <button onClick={this.loginOut} className="login-out">退出</button>
                    </div>
                    
                </div>
                <div className="header-bottom">
                    <div className="title">
                        {title}
                    </div>
                    <div className="time">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt={weather}/>
                        <span>{weather}</span>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default withRouter(Header)