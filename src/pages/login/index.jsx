import React, {Component} from 'react'
import "./login.less"
import logo from "./images/logo.png"
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from "../../api/index"
import memoryUtils from "../../utils/memoryUtils"
export default class Login extends Component {
        onFinish = (values) => {
            console.log('Received values of form: ', values);
            const {validateFields}=this.formRef
            validateFields().then(async(value)=>{
                const {username,password}=value
                const result=await reqLogin(username,password)
                console.log(result,'result')
                if(result.data.status===0){
                    message.success("登录成功")
                    //保存user
                    const user =result.data
                    memoryUtils.user = user//保存在内存中
                    this.props.history.replace('/')
                }else{
                    //提示错误信息
                    message.error(result.data.msg)
                }
            }).catch((err)=>{
                console.log(err,'err')
            })  
        }
        validatorPwd=(_,value)=>{
            if(!value){
                return Promise.reject('密码必须输入')
            }else{
                if(value.length<4){
                    return Promise.reject('密码不能小于4位')
                }
                if(value.length>12){
                    return Promise.reject('密码不能大于12位')
                }
                if(!/^[a-zA-Z0-9]+$/.test(value)){
                    return Promise.reject('密码必须是英文，数字或下划线组成')
                }
            }  
            return Promise.resolve()
        }
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="" />
                    <div className="title">React项目：后台管理系统</div>
                </header>
                <section className="login-content">
                    <div className="title">用户登陆</div>
                    <Form name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        ref={c=>this.formRef=c}>
                        <Form.Item name="username" rules={[
                            { required: true, message: '用户名必须输入' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名最多12位' },
                            { pattern: /^[a-zA-Z0-9]+$/, message: '用户名必须是英文，数字或下划线组成'},
                            ]}>
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,0.25)'}}/>}
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item name="password" rules={[
                            {
                                validator:this.validatorPwd
                            }
                            ]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,0.25)'}}/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/*
1.高阶函数
    1.一类特别的函数
        a.接收函数类型的函数
        b.返回值是函数
    2.常见
    a.定时器 setTimeout()/setInteral()
    b.Promise:Promise(()=>{}) then(value=>{},reason=>{})
    c.数组遍历的相关方法：forEach()/filter()/map()/reduce()/find()/findIndex()
    d.函数的对象bind()

    3.高阶函数更加动态，更加具有扩展性
        

2.高阶组件
    1.本质就是一个函数
    2.接收一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
    3.作用：扩展组件的功能
    4.高阶组件也是高阶函数：接收一个组件函数，返回一个新的组件函数
*/
