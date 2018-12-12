/*
* 包含了n个接口请求函数的模块
* */

//注册接口
import ajax from "./ajax";

export const reqRegister = (user) => ajax('/register',user,'POST')
//登录接口
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST')

//更新用户数据
export const reqUpdate = (user) => ajax('/update',user,'POST')
//获取用户信息
export const reqUser = () => ajax('/user')