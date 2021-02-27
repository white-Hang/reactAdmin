/*
能发送异步ajax请求的模块
封装axios库
函数的返回值是promise对象
1.优化：统一处理请求异常
       在外层包一个自己创建的promise对象
       在请求出错时，不reject（err），而是显示错误提示
2. 优化2: 异步得到不是reponse, 而是response.data
   在请求成功resolve时: resolve(response.data)
 */
import axios from "axios"
import {message} from "antd"
export default function ajax(url,data={},type="GET"){
    return new Promise((resolve,reject)=>{
        let promise
        if(type==='GET'){
            promise = axios.get(url,{//配置对象
                params:data
            })
        }else{
            promise=axios.post(url,data)
        }
        promise.then((response)=>{
                resolve(response.data)  
        }).catch((err)=>{
            message.error("请求出错了+",err.message)
        })
    })
    

}