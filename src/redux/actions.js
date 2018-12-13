/*
* 包含n个actionCreator
* 异步action
* 同步action
* */
import {
    ERROR_MSG,
    AUTH_SUCCESS,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USERLIST
} from './action-types'
import {
    reqRegister,
    reqLogin,
    reqUpdate,
    reqUser,
    reqUserList
} from '../api'

//授权成功的同步action
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
//错误提示信息的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})

const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
export  const resetUser = (msg) => ({type:RESET_USER,data:msg})
//接收用户列表的同步action
const receiveUserList = (userlist) => ({type:RECEIVE_USERLIST,data:userlist})



//注册的异步action
export const  register = (user) => {
    const {username,password,rePassword,type} = user

    if(password !== rePassword){
        return errorMsg('两次密码不一致！')
    }else if(!username){
        return errorMsg('用户名不能为空！')
    }else if(!password){
        return errorMsg('密码不能为空！')

    }
    return async dispatch => {
        //发送注册的异步请求
       const response = await reqRegister({username,password,type})
        const result = response.data
        if(result.code === 0){//成功
            //分发成功的action
            dispatch(authSuccess(result.data))
        }else{//失败
            //分发失败的action
            dispatch(errorMsg(result.msg))

        }
    }
}


//登录的异步action
export const  login = (user) => {
    const {username,password} = user

    if(!username || !password ){
        return errorMsg('用户名或密码不能为空！')
    }
    return async dispatch => {
        //发送注册的异步请求
        const response = await reqLogin({username,password})
        const result = response.data
        if(result.code === 0){//成功
            //分发成功的action
            dispatch(authSuccess(result.data))
        }else{//失败
            //分发失败的action
            dispatch(errorMsg(result.msg))

        }
    }
}

//更新的异步action
export const update = (user) => {
    return async dispatch => {
        const response = await reqUpdate(user)
        const result = response.data
        if(result.code === 0){//更新成功
            dispatch(receiveUser(result.data))
        }else{//更新失败
            dispatch(resetUser(result.msg))

        }
    }
}
//获取用户信息的异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0){//更新成功
            dispatch(receiveUser(result.data))
        }else{//更新失败
            dispatch(resetUser(result.msg))

        }
    }
}

//获取用户列表的一部action
export const getUserList = (type) => {
    return async dispatch => {
        //执行异步ajax请求
        console.log(type)
        const response = await reqUserList(type)
        const result = response.data
        if(result.code === 0){
            dispatch(receiveUserList(result.data))
        }
    }
}