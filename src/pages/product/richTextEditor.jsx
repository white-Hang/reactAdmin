import React, { Component } from 'react'
import PropTypes from "prop-types"
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//用来指定商品详情的富文本编辑器
export default class RichTextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),//创建一个没有内容的编辑对象
      };
      static propTypes={
        detail:PropTypes.string
      }
      constructor(props) {
        super(props);
        const html = this.props.detail;
        console.log(html)  
        if (html) {
          const contentBlock = htmlToDraft(html);
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.state = {
            editorState,
          };
        }else{
            this.state={editorState: EditorState.createEmpty()}
        }
      }
      //输入过程中实时的回调
      onEditorStateChange = (editorState) => {
          console.log('onEditorStateChange')
        this.setState({
          editorState,
        });
      };
      getDetail=()=>{
          //返回输入数据对应的html格式的文本
          return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      }
       uploadImageCallBack=(file)=> {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/manage/img/upload');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              const url = response.data.url.replace("http://localhost:5000","http://120.55.193.14:5000")
              resolve({data:{link:url}});
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            });
          }
        );
      }
    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{border: '1px solid black',minHeight:200,padding:10}}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                  }}
            />
        )
    }
}
