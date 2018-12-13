/*
* 主路由组件
* */
import React,{Component} from "react"
import {Switch,Route,Redirect} from 'react-router-dom'
import {getUser} from '../../redux/actions'
import {connect} from 'react-redux'
import {
    NavBar
} from 'antd-mobile'

import LaobanInfo from '../../containers/laoban-info/laoban-info'
import DashenInfo from '../../containers/dashen-info/dashen-info'
import Cookies from 'js-cookie'
import {getRedirectTo} from "../../utils/index";
import LaoBan from "../laoban/laoban";
import DaShen from "../dashen/dashen";
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../components/nav-footer/nav-footer'
class Main extends Component{

    //给组件对象添加属性
    navList = [
        {
            path:'/laoban',
            component:LaoBan,
            title:'大神列表',
            icon:'dashen',
            text:'大神'
        },
        {
            path:'/dashen',
            component:DaShen,
            title:'老板列表',
            icon:'laoban',
            text:'老板'
        },
        {
            path:'/message',
            component:Message,
            title:'消息列表',
            icon:'message',
            text:'消息'
        },
        {
            path:'/personal',
            component:Personal,
            title:'个人中心',
            icon:'personal',
            text:'个人'
        },
    ]

     componentWillMount (){
         //登陆过(cookies中有userid)，但没有登录(react中的user没有_id),发送请求获取
         const userid = Cookies.get('userid');
         const {_id} = this.props.user
         if(userid && !_id){
             //发送异步请求,获取user
             this.props.getUser()
         }
     }
    render(){
        //读取cookies中的userid
        const userid = Cookies.get('userid')
        //如果没有，自动重定向到登录界面
        if(!userid){
            return <Redirect to='/login'/>
        }
        //如果有，读取redux中的user状态
        const {user} = this.props
        //如果user没有_id,返回null
        // debugger/
        if(!user._id){
             return null
        }else{
            //如果请求的是根路径,根据user的type和header来计算出一个重定向的路由路径，并自动重定向
            let path = this.props.location.pathname
            const {type,header} = user
            if(path === '/'){
                path = getRedirectTo(type,header)
                return <Redirect to={path}/>
            }
        }

        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path)//获取当前路由列表

        if(currentNav){
            //决定哪个路由该隐藏
            if(user.type === 'laoban'){
                //隐藏数组的第二个
                navList[1].hide = true
            }else{
                navList[0].hide = true
            }
        }
        //如果有_id，显示对应的界面
        return(
            <div>
                {currentNav ? <NavBar>{currentNav.title}</NavBar>:null}

                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}></Route>)
                    }
                    <Route path='/laobanInfo' component={LaobanInfo}></Route>
                    <Route path='/dashenInfo' component={DashenInfo}></Route>
                </Switch>

                {currentNav ? <NavFooter navList={navList} />:null}
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {getUser}
)(Main)