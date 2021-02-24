/*
包含应用中所以请求的函数
每个接口的返回值都是promise
 */
import ajax from "./ajax"
const BASE="http://120.55.193.14:5000"
//登陆
export const reqLogin=(username,password)=>ajax(BASE+'/login',{username,password},'post')