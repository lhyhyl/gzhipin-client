/*
* 登录路由组件
* */
import React,{Component} from "react"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
// const ListItem = List.Item
 class Login extends Component{
    state = {
        username:'',//用户名
        password:'',//密码
    }

    login = () => {
       this.props.login(this.state)
    }

    //数据改变进行更新
    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }
    //没有账户，跳转到注册页
    toRegister = () => {
        this.props.history.replace('/register')
    }
    render(){
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return(
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
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toRegister}>没有账户,去注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)