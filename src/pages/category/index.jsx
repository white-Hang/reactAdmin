import React, { Component } from 'react'
import { Card,Button,Table, message,Modal } from 'antd';
import {
    PlusOutlined,
    ArrowRightOutlined
} from "@ant-design/icons"
import LinkButton from "../../components/linkButton"
import {reCategorys} from "../../api/index"
import AddOrupdate from "./addOrupdate"
import PubSub from 'pubsub-js'
export default class Category extends Component {
    state={
        loading	:false,
        categorys:[],//一级列表数据
        subCategorys:[],//二级分类列表
        parentId:"0",//当前需要显示的分类列表的父分类ID
        parentName:"",// 当前需要显示的分类列表的父分类名称
        isModalVisible:false,//判断添加和更新分类弹窗是否出现
        isUpdata:true,
        categoryId:"",//用于修改的id
    }
    //初始化列头
    initColumns=()=>{
        this.columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              align:'center',
              key: 'name',
            },
            {
              title: '操作',
              key: 'x',
              align:'center',
              width:300,
              render: (record) => (
                  <div>
                    <LinkButton onClick={()=>this.updataCategorys(record._id)}>修改分类</LinkButton>
                    {this.state.parentId==='0'?<LinkButton onClick={()=>this.getCategorys(record._id,record.name)}>查看子分类</LinkButton>:null}
                  </div>
              ),
            },
          ];
    }
    //异步获取一级和二级列表数据
    getCategorys = async (parentId,parentName)=>{
        parentId=parentId ? parentId:this.state.parentId
        this.setState({loading:true})
        const result = await reCategorys(parentId)
        this.setState({loading:false})
        if(result.status===0){
            if(parentId==='0'){
                this.setState({categorys:result.data,parentId,parentName:''})
            }else{
                this.setState({subCategorys:result.data,parentId,parentName})
            }
        }else{
            message.error("获取列表数据失败")
        }
    }
    //添加列表数据
    addForm=()=>{
        this.setState({isModalVisible:true,isUpdata:true})
    }
    //状态提升写法，需在子组件上绑定这两个方法
    // handleOk=(flag)=>{
    //     this.setState({isModalVisible:flag})
    // }
    // handleCancel=(flag)=>{
    //     this.setState({isModalVisible:flag})
    // }
    updataCategorys=(categoryId)=>{
        this.setState({isModalVisible:true,isUpdata:false,categoryId})
    }
    onCancel=()=>{
        this.form.resetFields()
        this.setState({isModalVisible:false})
    }
    componentDidMount(){
        this.getCategorys()
        //监听子组件传来的数据
        this.token = PubSub.subscribe('closeDig',(_,setFormObj)=>{
            console.log(setFormObj,'setFormObj')
			this.setState({isModalVisible:setFormObj.flag,form:setFormObj.formRef})
            if(setFormObj.success){
                const {parentId,parentName}=setFormObj
                this.getCategorys(parentId,parentName)
            }
		})
    }
    componentWillMount(){
        this.initColumns()
    }
	componentWillUnmount(){
		PubSub.unsubscribe(this.token)
	}
    render() {
        const {loading,categorys,parentId,subCategorys,parentName,isModalVisible,isUpdata,categoryId} =this.state
        console.log(parentId,'传递')
        const title=parentId==='0'?"一级分类列表":(
            <span>
                <LinkButton onClick={()=>this.getCategorys('0')}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{marginRight: 5}}/>
                <span>{parentName}</span>
            </span>
        )
        const addbtn=<Button type="primary" icon={<PlusOutlined />} onClick={this.addForm}>
                        添加
                     </Button>
        return (
            <div className="category">
                <Card title={title} extra={addbtn}>
                    <Table 
                    bordered
                    loading={loading}
                    rowKey="_id"
                    pagination={{defaultPageSize: 5, showQuickJumper: true}}
                    dataSource={parentId==='0'?categorys:subCategorys} 
                    columns={this.columns} />;
                    <Modal title="添加分类" visible={isModalVisible} footer={null} onCancel={this.onCancel}>
                        <AddOrupdate categoryId={categoryId} isUpdata={isUpdata} categorys={categorys} parentId={parentId} setForm={(form)=>this.form=form}></AddOrupdate>
                    </Modal>
                </Card>
            </div>
        )
    }
}
