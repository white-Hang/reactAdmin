import React , {Component} from "react"
import {
    Form,
    Button,
    Input,
    Card,
    Cascader,
    message
  } from 'antd';
import { ArrowLeftOutlined} from '@ant-design/icons';
import LinkButton from "../../components/linkButton"
import PicturesWall from './pictures-wall'
import RichTextEditor from "./richTextEditor"
import {reCategorys,reqAddOrUpdateProduct} from "../../api"
const { TextArea } = Input;
//指定item布局的配置项
const formItemLayout = {
    labelCol: { span: 2 },//左侧label的宽度
    wrapperCol: { span: 8 },//指定右侧包裹的宽度
  };
export default class AddUpdate extends Component{
    state={
        options:[],
    }
    pw = React.createRef()
    editor=React.createRef()
    //验证价格的函数
    validatorPrice=(_,value)=>{
        console.log(value)
        if(value*1>0){
            return Promise.resolve()
        }else{
            return Promise.reject('价格必须大于0')
        }
    }
     onFinish = async(values) => {
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()
        const {name,desc,price,categoryIds} = values
        let pCategoryId,categoryId
        if(categoryIds.length===1){
            pCategoryId='0'
            categoryId=categoryIds[0]
        }else{
            pCategoryId=categoryIds[0]
            categoryId=categoryIds[1]
        }
        console.log(categoryIds,'categoryIds')
        const product ={name,desc,price,detail,imgs,pCategoryId,categoryId}
        if(this.isUpdate){
            product._id=this.product._id
        }
        const result = await reqAddOrUpdateProduct(product)
        if(result.status===0){
             message.success(`${this.isUpdate?'更新':'添加'}商品成功！`)
             this.props.history.goBack()
        }else{
            message.success(`${this.isUpdate?'更新':'添加'}商品失败！`)
        }
        console.log('Received values of form: ',this.pw.current, values,imgs,detail);
      };
      onChange=()=>{

      }
         
      loadData= async(selectedOptions)=>{
          //得到选中的options对象
          console.log(selectedOptions,'selectedOptions')
          const targetOption = selectedOptions[0]
          //显示loading
          targetOption.loading=true
          //根据选中的分类，请求获取二级分类列表
          const subCategorys = await this.getCategorys(targetOption.value)
          //隐藏loading
          targetOption.loading = false
          //二级分类数组有数据
          if(subCategorys&&subCategorys.length>0){
              //生成一个二级列表的options
            const childOptions = subCategorys.map(item=>({
                value:item._id,
                label:item.name,
                isLeaf:true
            }))
            //关联到当前的option上
            targetOption.children = childOptions
          }else{//当前选中的分类没有二级分类
            targetOption.isLeaf=true
          }
          this.setState({
              options:[...this.state.options]
          })
      }
      //获取一级和二级分类列表
    //   async函数的返回值是一个新的promise对象，promise的结果和值由async的结果来决定
      getCategorys= async(parentId)=>{
        const result = await reCategorys(parentId)
        if(result.status===0){
            const categorys = result.data
            if(parentId==='0'){
                this.initOptions(categorys)
            }else{//二级列表===>当前async函数返回的promise就会成功且value为categorys
                return categorys
            }
            
        }
      }
      initOptions= async(categorys)=>{
          //根据categorys生成options数组
          const options=categorys.map(item=>({
              value:item._id,
              label:item.name,
              isLeaf:false
          }))
          //如果是一个二级分类列表的更新
          const {isUpdate,product} = this
          const {pCategoryId,categoryId} = product
          if(isUpdate&&pCategoryId !== '0'){
              //获取对应的二级分类列表
              const subCategorys = await this.getCategorys(pCategoryId)
              //生成二级下拉列表的options
              const childOptions = subCategorys.map(item=>({
                value:item._id,
                label:item.name,
                isLeaf:true
              }))
              //找到当前商品对应的一级option对象
              const targetOption = options.find(option=>option.value===pCategoryId)
              //关联对应的一级option上
              targetOption.children = childOptions
          }
          //更新options状态
          this.setState({
              options
          })
      }
      componentDidMount(){
          this.getCategorys('0')
      }
      componentWillMount(){
          const product = this.props.location.state //如果是添加没值，否则有值
          console.log(product,'product')
          //保存是否是更新的标识
          this.isUpdate = !!product
          this.product = product || {}
        }
    render(){
        const {options} = this.state
        const {isUpdate,product} = this
        const {pCategoryId,categoryId} = product
        //用于接收级连分类ID的数组
        const categoryIds = []
        if(isUpdate){
            if(pCategoryId==='0'){
                categoryIds.push(categoryId)
            }else{
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }
        console.log(categoryIds,'categoryIds1232131')
        const title= (
            <span>
                <LinkButton onClick={()=>this.props.history.go(-1)}>
                    <ArrowLeftOutlined style={{marginRight: 10, fontSize: 20}}/>
                </LinkButton>
            <span>{isUpdate?"修改商品":"添加商品"}</span>
            </span> 
        )
        return (
        <Card title={title}>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={this.onFinish}
                initialValues={{
                    name:product.name,
                    desc:product.desc,
                    price:product.price,
                    categoryIds
                }}
            >
                <Form.Item
                    label="商品名称"
                    name="name"
                    rules={[{ required: true, message: '请输入商品名称' }]}
                    >
                    <Input placeholder="请输入商品名称" />
                </Form.Item>
                <Form.Item
                    label="商品描述"
                    name="desc"
                    rules={[
                        { required: true, message: '请输入商品描述' },
                    ]}
                    >
                    <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }}/>
                </Form.Item>
                <Form.Item label="商品价格" name="price" rules={[
                    { required: true, message: '请输入商品价格' },
                    {validator: this.validatorPrice}
                    ]}>
                <Input type="number" placeholder="请输入商品价格" addonAfter="元"/>
                </Form.Item>
                <Form.Item
                    name="categoryIds"
                    label="商品分类"
                    rules={[{ required: true, message: '请选择商品分类' }]}
                >
                    <Cascader placeholder="请选择商品分类" options={options} loadData={this.loadData} onChange={this.onChange}></Cascader>
                </Form.Item>
                <Form.Item label="商品图片">
                    <PicturesWall ref={this.pw} imgs={product.imgs}/>
                </Form.Item>
                <Form.Item label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 20}}>
                    <RichTextEditor ref={this.editor} detail={product.detail}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
        </Form>
    </Card>
        )
    }
}