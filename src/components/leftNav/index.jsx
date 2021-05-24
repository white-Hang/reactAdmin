import React, {Component} from "react"
  import { Menu } from 'antd';
  import {Link,withRouter} from "react-router-dom"
  import logo from "../../assets/images/logo.png"
  import "./leftNav.less"
  import menuList from "../../config/menuConfig"
  import memoryUtils from "../../utils/memoryUtils";
  const { SubMenu } = Menu;
  class LeftNav extends Component{
      /*
  判断当前登陆用户对item是否有权限
   */
  hasAuth = (item) => {
    const {key, isPublic} = item

    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: key有没有menus中
     */
    if(username==='admin' || isPublic || menus.indexOf(key)!==-1) {
      return true
    } else if(item.children){ // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
    }

    return false
  }
      //根据menu的数据数组生成对应的标签数组 使用map（）+递归调用
    //   getMenuNodes_map=(menuList)=>{
    //     return menuList.map(item=>{
    //         /*
    //             {
    //                 title:'首页'，//菜单标题名称
    //                 key:"/home", //对应的path
    //                 icon:"icon", //图标名称
    //                 children:[]  //可能有，也可能没有
    //             }
    //          */
    //         if(!item.children){
    //             console.log(item.key)
    //             return (
    //                 <Menu.Item key={item.key} icon={item.icon}>
    //                     <Link to={item.key}>
    //                     {item.title}
    //                     </Link>
    //                 </Menu.Item> 
    //             )   
    //         }else{
    //             return (
    //                 <SubMenu key={item.key} icon={item.icon} title={item.title}>
    //                     {this.getMenuNodes(item.children)}
    //                 </SubMenu>
    //             )  
    //         }
    //     })
    //   }
    //根据menu的数据数组生成对应的标签数组 使用reduce（）+递归调用
    getMenuNodes=(menuList)=>{
        const path=this.props.location.pathname
        
        return menuList.reduce((pre,item)=>{
            // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
            if (this.hasAuth(item)) {
            // 向pre添加Menu.Item
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>  
                ))
            }else{
                //查找一个与当前请求路径匹配的子item
                const cItem=item.children.find(cItem=>path.indexOf(cItem.key)===0)
                if(cItem){
                    this.openKey=item.key
                }
                //如果存在说明当前item的子列表需要展开
                
                pre.push((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                         {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
        }
            // 向pre添加SubMenu
            return pre
        },[])
    }
    /*
        在第一次render（）之前执行一次
        为第一个render（）准备数据（必须同步的）
     */
    componentWillMount(){
        this.menuNodes=this.getMenuNodes(menuList)
    }
      render(){
          //得到当前请求的路径
          let path=this.props.location.pathname
          if(path.indexOf("/product")===0){
                path="/product"
            }
          const {openKey}=this
          return(
              <div className="left-nav">
                    <Link to="/" className="logo left-nav-header">
                        <img src={logo} alt="logo"/>
                        <h1>硅谷后台</h1>
                    </Link>
                    <Menu theme="dark" mode="inline" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
          {this.menuNodes}
                    </Menu>
              </div>
          )
             
      }
  }
  /*
  withRouter是一个高阶组件：
  包装非路由组件，返回一个新的组件
  新的组件向非路由组件传递3个属性：history/Location/match
   */
  export default withRouter(LeftNav)