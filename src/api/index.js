/*
包含应用中所以请求的函数
每个接口的返回值都是promise
 */
import ajax from "./ajax"
import jsonp from "jsonp"
import { message } from "antd"
const BASE="http://120.55.193.14:5000"
//登陆
export const reqLogin=(username,password)=>ajax(BASE+'/login',{username,password},'post')

// 获取一级/二级分类的列表
export const reCategorys=(parentId)=>ajax(BASE+'/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')
/*
    jsonp请求函数
 */

 export const reWeather=(city)=>{
     return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        // const url=`https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=6ca7b720f2ab2a48f749c1e19c3d1c47 `
        //发送jsonp请求
        jsonp(url,{},(err,data)=>{
           if(!err&&data.status!=="success"){
            // 取出需要的数据
            // const {dayPictureUrl, weather} = data.results[0].weather_data[0]
            const obj={
                dayPictureUrl:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2187720189,605271663&fm=26&gp=0.jpg",
                weather:"晴天"
            }
            resolve(obj)
           }else{
               message.error("获取天气信息失败")
           }
        })
     })   
 }