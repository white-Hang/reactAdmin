import React , {Component} from "react"
import {
    Form,
    Select,
    InputNumber,
    Button,
    Input,
    Card
  } from 'antd';
import { ArrowLeftOutlined} from '@ant-design/icons';
import LinkButton from "../../components/linkButton"
import PicturesWall from './pictures-wall'
const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };
export default class AddUpdate extends Component{
    onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    render(){
        const title= (
            <span>
                <LinkButton onClick={()=>this.props.history.go(-1)}>
                    <ArrowLeftOutlined style={{marginRight: 10, fontSize: 20}}/>
                </LinkButton>
            <span>添加商品</span>
            </span> 
        )
        return (
        <Card title={title}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={this.onFinish}
                initialValues={{}}
            >
                <Form.Item
                    label="商品名称"
                    name="categoryName"
                    rules={[{ required: true, message: '请输入商品名称' }]}
                    >
                    <Input placeholder="请输入商品名称"/>
                </Form.Item>
                <Form.Item
                    label="商品描述"
                    name="categoryName"
                    rules={[{ required: true, message: '请输入商品描述' }]}
                    >
                    <Input placeholder="请输入商品描述"/>
                </Form.Item>
                <Form.Item label="商品价格">
                <Form.Item name="input-number" noStyle>
                <InputNumber/>
                </Form.Item>
                <span className="ant-form-text">元</span>
                </Form.Item>
                <Form.Item
                    name="select"
                    label="商品分类"
                    rules={[{ required: true, message: 'Please select your country!' }]}
                >
                    <Select placeholder="请选择商品分类">
                    <Option value="china">China</Option>
                    <Option value="usa">U.S.A</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="商品图片">
                    <PicturesWall />
                </Form.Item>
                <Form.Item label="商品详情">
                </Form.Item>
        </Form>
    </Card>
        )
    }
}