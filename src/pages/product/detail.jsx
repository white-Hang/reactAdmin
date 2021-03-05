import React , {Component} from "react"
import { Card,List } from 'antd';
import {
    ArrowLeftOutlined,
} from "@ant-design/icons"
import LinkButton from "../../components/linkButton"
import {reqCategory} from "../../api/index"
import {BASE_IMG_URL} from "../../utils/constants"
const {Item} = List
export default class Detail extends Component{
    state={
        cName1:"",
        cName2:""
    }
    componentDidMount(){
        this.getCategoryName()
    }
    getCategoryName= async()=>{
        const {pCategoryId,categoryId} = this.props.location.state.product
        const result = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
        this.setState({
            cName1:result[0].data.name,
            cName2:result[1].data.name
        })
    }
    render(){
        const {name,desc,detail,price,imgs} = this.props.location.state.product
        const {cName1,cName2} = this.state
        const title=(
            <span>
                <LinkButton onClick={()=>this.props.history.go(-1)}>
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
                        <div>
                            <span className="left">所属分类:</span>
                            <span>{cName1}{cName2? '--->'+cName2:""}</span>
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="left">商品图片:</span>
                            {imgs.map(img=><img src={BASE_IMG_URL+img} alt="img" key={img} className="product-img"/>)}
                        </div>
                    </Item>
                    <Item>
                        <div>
                            <span className="left">商品详情:</span>
                            <div dangerouslySetInnerHTML={{ __html: detail }} />
                        </div>
                    </Item>
                </List>
            </Card>
        )
    }
}