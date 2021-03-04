import React , {Component} from "react"
import { Card,List } from 'antd';
import {
    ArrowLeftOutlined,
} from "@ant-design/icons"
import LinkButton from "../../components/linkButton"
const {Item} = List
export default class Detail extends Component{
    render(){
        const {name,desc,detail,price} = this.props.location.state.product
        const title=(
            <span>
                <LinkButton>
                    <ArrowLeftOutlined style={{marginRight: 10, fontSize: 20}}/>
                </LinkButton>
            <span>商品详情</span>
            </span> 
        )
        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <div>
                            <span className="left">商品名称:</span>
                            <span>{name}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="left">商品描述:</span>
                            <span>{desc}</span>
                        </div>    
                    </Item>
                    <Item>
                        <div>
                            <span className="left">商品价格:</span>
                            <span>{price}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>所属分类:</div>
                    </Item>
                    <Item>
                        <div>商品图片:</div>
                    </Item>
                    <Item>
                        <div>商品详情:</div>
                    </Item>
                </List>
            </Card>
        )
    }
}