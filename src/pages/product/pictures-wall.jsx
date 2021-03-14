import React , {Component} from "react"
import { Upload, Modal } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
export default class PicturesWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList:[
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
        ],
        previewTitle: '',
      };
      handleCancel = () => this.setState({ previewVisible: false });
      handleChange = ({ fileList }) => this.setState({ fileList });
      handlePreview = async file => {
        console.log(file,'file')
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
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
                    action="manage/img/upload"//上传图片的接口地址
                    accept="image/*"//只接受图片格式
                    name="image"//请求参数名
                    listType="picture-card"//卡片样式
                    fileList={fileList}//所有已上传图片文件对象的数组
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
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