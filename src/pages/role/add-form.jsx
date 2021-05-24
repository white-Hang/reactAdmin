import React, { Component } from 'react'
import {Form,Input} from "antd"
const Item = Form.Item
export default class AddForm extends Component {
    componentDidMount(){
        this.props.setForm(this.formRef)
    }
    
    render() {
        // 指定Item布局的配置对象
    const formItemLayout = {
        labelCol: { span: 4 },  // 左侧label的宽度
        wrapperCol: { span: 15 }, // 右侧包裹的宽度
      }
        return (
            <Form ref={c=>this.formRef=c}>
                <Item label="角色名称" 
                {...formItemLayout} 
                name="roleName"
                rules={[{ required: true, message: '角色名称必须输入' }]}>
                    <Input placeholder='请输入角色名称'/>
                </Item>
            </Form>
        )
    }
}
