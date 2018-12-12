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
 class LaobanInfo extends Component{
    state={
        header: '', // 头像名称
        post: '', // 职位
        info: '', // 个人或职位简介
        company: '', // 公司名称
        salary: '' // 工资
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
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placehoder='请输入招聘职位' onChange={(val) => this.handleChange('post',val)}>招聘职位:</InputItem>
                <InputItem placehoder='请输入公司名称' onChange={(val) => this.handleChange('company',val)}>公司名称:</InputItem>
                <InputItem placehoder='请输入职位薪资' onChange={(val) => this.handleChange('salary',val)}>职位薪资:</InputItem>
                <TextareaItem title='职位要求:'
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
)(LaobanInfo)