import React,{Component} from "react"
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeaderSelector extends Component{
    static Proptypes = {
        setHeader:PropTypes.func.isRequired
    }
    state = {
        icon:null//默认为空
    }
    constructor(props){
        super(props)
        //准备需要显示的数据
        this.headerList = []
        for(let i = 0;i < 20;i++){
            this.headerList.push({
                text:'头像'+(i+1),
                icon:require(`../../assets/images/头像${i+1}.png`)
            })
        }
    }
    handleClick = ({text,icon}) => {
        //更新组件状态
        this.setState({
            icon
        })

        //调用父组件方法
        this.props.setHeader(text)
    }
    render(){
        const {icon} = this.state
        const listHeader = !icon? '请选择头像':(
            <div>
                已选择头像:<img src={icon} alt=""/>
            </div>
        )
        return(
            <List renderHeader= {() => listHeader}>
                <Grid data={this.headerList}
                      columnNum={5}
                      onClick={this.handleClick}/>
            </List>
        )
    }
}