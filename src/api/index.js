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

/*
    jsonp请求函数
 */

 export const reWeather=(city)=>{
     return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        //发送jsonp请求
        jsonp(url,{},(err,data)=>{
           console.log(err,data)
           if(!err&&data.status==="success"){
            // 取出需要的数据
            const {dayPictureUrl, weather} = data.results[0].weather_data[0]
            resolve({dayPictureUrl, weather})
           }else{
               message.error("获取天气信息失败")
           }
        })
     })
     
 }
 reWeather('北京')