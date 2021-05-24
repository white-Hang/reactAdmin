import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from "antd"
import moment from "moment"
import {reqRoles,reqAddRole,reqUpdateRole} from "../../api/index"
import AddForm from "./add-form"
import AuthForm from "./auth-form"
import memoryUtils from "../../utils/memoryUtils"
import storageUtils from "../../utils/storageUtil";
export default class Role extends Component {
    state={
        roles:[],
        role: {}, // 选中的role
        isShowAdd:false,
        isShowAuth:false
    }
    auth = React.createRef()
    addRole=()=>{
        this.form.validateFields().then( async(value)=>{
            const {roleName} = value
            this.setState({
                isShowAdd:false
            })
            this.form.resetFields()
            const result = await reqAddRole(roleName)
            if(result.status===0){
                message.success("添加角色成功")
                // this.getRoles()
                const role = result.data
                const {roles} = this.state
                console.log(roles,'roles')
                this.setState({
                    roles:[...roles,role]
                })
            }

        }).catch(res=>{
            message.error("添加角色失败")
        })
    }
    /*
  更新角色
   */
  updateRole = async () => {

    // 隐藏确认框
    this.setState({
      isShowAuth: false
    })

    const role = this.state.role
    // 得到最新的menus
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username

    // 请求更新
    const result = await reqUpdateRole(role)
    if (result.status===0) {
      // this.getRoles()
      // 如果当前更新的是自己角色的权限, 强制退出
      if (role._id === memoryUtils.user.role_id) {
        memoryUtils.user = {}
        storageUtils.removeUser()
        this.props.history.replace('/login')
        message.success('当前用户角色权限成功')
      } else {
        message.success('设置角色权限成功')
        // this.setState({
        //   roles: [...this.state.roles]
        // })
      }

    }
  }

    onRow=(role)=>{
        return {
            onClick: event =>{
                console.log("row Click",role,event)
                this.setState({
                    role
                })
            }
        }
    }
    initColumn = () => {
        this.columns = [
          {
            title: '角色名称',
            dataIndex: 'name'
          },
          {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (create_time) => moment(create_time).format("YYYY-MM-DD")
          },
          {
            title: '授权时间',
            dataIndex: 'auth_time',
            render: (auth_time) => moment(auth_time).format("YYYY-MM-DD")
          },
          {
            title: '授权人',
            dataIndex: 'auth_name'
          },
        ]
      }
      //获取权限列表
     getRoles= async()=>{
        const result = await reqRoles()
        if(result.status===0){
            this.setState({
                roles:result.data
            })
        }
        console.log(result,'result')
      }
      componentWillMount(){
        this.initColumn()
      }
      componentDidMount(){
          this.getRoles()
      }
    render() {
        const {roles,isShowAdd,role,isShowAuth} = this.state
        const title=(
            <span>
                <Button type="primary" onClick={()=>this.setState({isShowAdd:true})}>创建角色</Button>&nbsp;&nbsp;
                <Button type="primary" disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize: 3}}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect: (role) => { // 选择某个radio时回调
                        this.setState({
                            role
                        })
                        }
                    }}
                    onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({isShowAdd: false})
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => this.form = form}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({isShowAuth: false})
          }}
        >
          <AuthForm ref={this.auth} role={role}/>
        </Modal>
            </Card>
        )
    }
}
