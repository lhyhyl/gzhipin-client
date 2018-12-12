import React,{Component} from "react"
import {connect} from 'react-redux'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {update} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
 class DashenInfo extends Component{
     state={
         header: '', // 头像名称
         post: '', // 职位
         info: '', // 个人或职位简介
     }
     //更新头像
     setHeader = (header) => {
         this.setState({
             header
         })
     }
     //更新组件状态
     handleChange = (name,val) => {
         this.setState({
             [name]:val
         })
     }
     //保存更新后的数据
     save = () =>{
         this.props.update(this.state)
     }
    render(){
        const {header,type} = this.props.user
        if(header){
            const path = type === 'laoban'?'/laoban':'/dashen'
            return <Redirect to={path}/>
        }
        return(
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placehoder='请输入求职岗位' onChange={(val) => this.handleChange('post',val)}>求职岗位:</InputItem>
                <TextareaItem title='个人介绍:'
                              rows={3}
                              onChange={(val) => this.handleChange('info',val)}/>
                <Button type='primary' onClick={this.save}>保{'  '}存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {update}
)(DashenInfo)