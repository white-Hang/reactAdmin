import React , {Component,PureComponent} from "react"
import { Form, Input, Select,Button,message } from 'antd';
import PubSub from 'pubsub-js'
import {reqAddCategory} from "../../api/index"
const { Option } = Select;
export default class AddOrupdate extends Component {
    handleOk=()=>{
        //状态提升写法
        // this.props.handleOk(false)
        const {validateFields}=this.formRef
        validateFields().then(async(value)=>{
            const {parentId,categoryName}=value
            const result=await reqAddCategory(categoryName,parentId)
            if(result.status===0){
                message.success("添加成功")
                 //向父组件传递参数
                let parentName=""
                if(parentId!=='0'){
                    parentName=this.props.categorys.find(item=>item._id===parentId).name
                }
                this.formRef.resetFields()
                PubSub.publish("closeDig",{flag:false,success:true,parentId,parentName})
            }else{
                //提示错误信息
                this.formRef.resetFields()
                PubSub.publish("closeDig",{flag:false,success:false})
                message.error("添加失败")
            }
        }).catch((err)=>{
            console.log(err,'err')
        }) 
    }
    handleCancle=()=>{
        // 清除输入数据
        this.formRef.resetFields()
        PubSub.publish("closeDig",{flag:false})
        // this.props.handleCancle(false)
    }
    render(){
        const {categorys,parentId}=this.props
        console.log(parentId,'接收')
        return (
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                ref={c=>this.formRef=c}
      >
                <Form.Item
                name="parentId"
                label="所属分类"
                hasFeedback
                rules={[{ required: true, message: '请选择分类类型' }]}
            >
                <Select defaultValue={parentId}>
                <Option value="0">一级分类</Option>
               {   
                    categorys.map(item=><Option value={item._id} key={item._id}>{item.name}</Option>)
               }
                </Select>
            </Form.Item>
            <Form.Item
            label="分类名称"
            name="categoryName"
            rules={[{ required: true, message: '请输入分类名称' }]}
            >
            <Input placeholder="请输入分类名称"/>
            </Form.Item>
            <Form.Item style={{textAlign:"right"}}>
                <Button style={{marginRight:"20px"}} onClick={this.handleCancle}>取消</Button>
                <Button type="primary" onClick={this.handleOk}>确认</Button>
            </Form.Item>
      </Form>
        )
    }
}