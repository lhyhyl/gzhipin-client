import React,{Component} from "react"
import {resetUser} from '../../redux/actions'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {
    Result,
    List,
    WhiteSpace,
    Button,
    Modal
} from 'antd-mobile'
const Item = List.Item
const Brife = Item.Brief
 class Personal extends Component{

    logout = () => {
        Modal.alert('退出','确定退出登录吗？',[
            {text:'取消'},
            {
                text:'确定',
                onPress:()=>{
                    //干掉cookies中的userid
                    Cookies.remove('userid')
                    //干掉redux中的user
                    this.props.resetUser()
                }
            }
        ])
    }
    render(){
        const {username,info,header,company,post,salary} =this.props.user
        return(
            <div>
               <Result
                   img={<img src={require(`../../assets/images/${header}.png`)} style={{width:50}} alt="header"/>}
                   title={username}
                   message={company}
               />
                <List renderHeader={() => '相关息信'}>
                    <Item>
                        <Brife>职位:{post}</Brife>
                        <Brife>简介:{info}</Brife>
                        {salary ? <Brife>薪资：{salary}</Brife>:null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type="warning" onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)
