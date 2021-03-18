import React , {Component} from "react"
import PropTypes from "prop-types"
import { Upload, Modal,message } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {reqDeleteImg} from "../../api"
// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
//   }
export default class PicturesWall extends Component {
  static propTypes = {
    imgs : PropTypes.array
  }
    state = {
        previewVisible: false,// 标识是否显示大图预览Modal
        previewImage: '',// 大图的url
        fileList:[
            // {
            //     uid: '-1',// 每个file都有自己唯一的id
            //     name: 'image.png',// 图片文件名
            //     status: 'done',// 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',// 图片地址
            //   },
        ],
        previewTitle: '',
      };
      constructor(props){
        super(props)
        let fileList = []
        //如果传入来imgs属性
        const {imgs} = this.props
        if(imgs && imgs.length >0){
          fileList = imgs.map((img,index)=>({
                uid: -index,// 每个file都有自己唯一的id
                name: img,// 图片文件名
                status: 'done',// 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url: "http://120.55.193.14:5000/upload/" + img,// 图片地址
          }))
        }
        this.state={
          previewVisible: false,// 标识是否显示大图预览Modal
          previewImage: '',// 大图的url
          fileList,//所有已上传数组
          previewTitle: '',
        }
      }
      //获取所以以上传图片文件名的数组
      getImgs=()=>{
        return this.state.fileList.map(file=>file.name)
      }
       /*
        隐藏Modal
        */
      handleCancel = () => this.setState({ previewVisible: false });
      handleChange = async({ file,fileList }) =>{
        console.log(file,fileList,'file')
        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if(file.status==='done'){
            const result = file.response // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            if(result.status===0){
                message.success("上传图片成功")
                const {name,url} = file.response.data
                file=fileList[fileList.length-1]
                file.name=name
                file.url=url.replace("http://localhost:5000","http://120.55.193.14:5000")
            }else{
                message.error("上传图片失败")
            }    
        }else if(file.status==="removed"){
            const result = await reqDeleteImg(file.name)
            if(result.status===0){
                message.success("删除图片成功")
            }else{
                message.error("删除图片失败")
            }
        }
        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList })
      };
      handlePreview = async file => {
        console.log('handlePreview()', file)
        // if (!file.url && !file.preview) {
        //   file.preview = await getBase64(file.originFileObj);
        // }
        // 显示指定file对应的大图
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
      };
    render(){
        const {  previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          );
        return (
            <div>
                 <Upload
                    action="/manage/img/upload"//上传图片的接口地址
                    accept="image/*"//只接收图片格式
                    name="image"//请求参数名
                    listType="picture-card"//卡片样式
                    fileList={fileList}//所有已上传图片文件对象的数组
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
                >
                     <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
           
        )
    }
}
/*
1.自组件调用父组件的方法，将父组件的方法以函数属性的形式传递给子组件，子组件就可以调用
2.父组件调用子组件的方法，在父组件通过ref获取子组件标签对象（也就是组件对象），调用其方法 
 */