/*
* 主路由组件
* */
import React,{Component} from "react"
import {Switch,Route,Redirect} from 'react-router-dom'
import {getUser} from '../../redux/actions'
import {connect} from 'react-redux'
import LaobanInfo from '../../containers/laoban-info/laoban-info'
import DashenInfo from '../../containers/dashen-info/dashen-info'
import Cookies from 'js-cookie'
import {getRedirectTo} from "../../utils/index";
import LaoBan from "../laoban/laoban";
import DaShen from "../dashen/dashen";
class Main extends Component{

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
        //如果有_id，显示对应的界面
        return(
            <div>
                <Switch>
                    <Route path='/laoban' component={LaoBan}></Route>
                    <Route path='/dashen' component={DaShen}></Route>
                    <Route path='/laobanInfo' component={LaobanInfo}></Route>
                    <Route path='/dashenInfo' component={DashenInfo}></Route>
                </Switch>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {getUser}
)(Main)