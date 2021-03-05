import React , {Component} from "react"
import { Card,Button,Table, message,Select,Input } from 'antd';
import {
    PlusOutlined,
} from "@ant-design/icons"
import LinkButton from '../../components/linkButton'
import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api'
const {Option} = Select
export default class Home extends Component{
    state={
        searchType:"productName",//搜索类型
        searchName:"",//搜索的关键字
        loading:false,
        products:[],
        total:0,//数据总数
        size:3,//列表每页展示条数
        current:1//当前页码
    }
     /*
  初始化table的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
      },
      {
        width: 100,
        title: '状态',
        // dataIndex: 'status',
        render: (product) => {
            const {status,_id} = product
            const newStatus = status===1 ? 2 : 1
          return (
            <span>
              <Button
                type='primary'
                onClick={()=>this.updataStatus(_id,newStatus)}
              >
                {status===1 ? '下架' : '上架'}
            </Button>
            <span>{status===1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick={()=>this.props.history.push("/product/detail",{product})}>详情</LinkButton>
              <LinkButton onClick={()=>this.props.history.push("/product/addupdate",product)}>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }
   /*
  获取指定页码的列表数据显示
   */
  getProducts = async(current,size)=>{
    this.setState({loading:true,size,current})
    const {searchType,searchName} = this.state
    let result
    if(searchName){
        result = await reqSearchProducts({pageNum:current,pageSize:size,searchName,searchType})
    }else{
        result = await reqProducts(current,size)
    }
    this.setState({loading:false})
    if(result.status===0){
        const {total,list:products} = result.data
        this.setState({total,products})
    }
  }
  //更新商品状态
  updataStatus= async(productId,status)=>{
        const result=await reqUpdateStatus(productId,status)
        if(result.status===0){
            message.success("更新商品成功")
            const {current,size} = this.state
            this.getProducts(current,size)
        }
  }
  componentWillMount(){
        this.initColumns()
  }
  componentDidMount(){
      const {size} = this.state
      this.getProducts('1',size)
  }
    render(){
        const {products,searchType,searchName,loading,total,size,current} = this.state
        const title = (
            <span>
                <Select 
                value={searchType}
                style={{width:150}}
                onChange={value=>this.setState({searchType:value})}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input 
                placeholder="请输入关键字" 
                value={searchName} 
                style={{width:150,margin:'0 15px'}}
                onChange={event=>this.setState({searchName:event.target.value})}/>
                <Button type="primary" onClick={()=>this.getProducts(1,size)}>搜索</Button>
            </span>
            )
        const extra=(
            <Button type="primary" icon={<PlusOutlined />}>
                        添加商品
             </Button>
        )
        
        return (
            <Card title={title} extra={extra}>
                <Table 
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={products}
                columns={this.columns}
                pagination={{
                  current,
                  total,
                  defaultPageSize: 3,
                  showQuickJumper: true,
                  onChange: this.getProducts
                }}
                />
            </Card>
        )
    }
}