/*
* 注册路由组件
* */
import React,{Component} from "react"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions'

import '../../assets/css/index.less'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
        } from 'antd-mobile'
import Logo from '../../components/logo/logo'
const ListItem = List.Item
 class Register extends Component{
    state = {
        username:'',//用户名
        password:'',//密码
        rePassword:'',//确认密码
        type:'dashen',//用户类型
    }

    register = () => {
        this.props.register(this.state)
    }

    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }

    //点击已有账户，跳转到登录页面
    toLogin = () => {
        this.props.history.replace('/login')
    }
    render(){
        const {type} = this.state
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div>:null}
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val => this.handleChange('username',val)}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={val => this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请确认密码' type='password' onChange={val => this.handleChange('rePassword',val)}>确认密码：</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type','dashen')}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type','laoban')}>老板</Radio>
                        </ListItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toLogin}>已有账户,去登录</Button>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({user:state.user}),
    {register}
)(Register)