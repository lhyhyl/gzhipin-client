/*
* 包含多个reducer函数，根据老的state和action返回一个新的state
*
* */
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USERLIST
} from './action-types'
import {combineReducers} from 'redux'

import {getRedirectTo} from '../utils'
const initUser = {
    username:'',//用户名
    type:'',//用户类型
    msg:'',//提示信息
    redirectTo:''//重定向的路由
}
//产生user状态的reducer
function user(state = initUser,action) {
    switch (action.type){
        case AUTH_SUCCESS://data是user
            const {type,header} = action.data
            return {...action.data,redirectTo:getRedirectTo(type,header)}
        case ERROR_MSG:
            return {msg:action.data}
        case RECEIVE_USER:
            return {...action.data}
        case RESET_USER:
            return {...initUser,msg:action.data}
        default:
            return state
    }

}


const initUserList = []
//产生userlist状态的reducer
function userList(state = initUserList,action) {
    switch (action.type){
        case RECEIVE_USERLIST:
            return action.data
        default:
            return state

    }
}

export default combineReducers({
    user,
    userList
})