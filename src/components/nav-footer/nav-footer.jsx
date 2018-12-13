import React,{Component} from "react"
import PropTypes from 'prop-types'
import {
    TabBar,
} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item
class NavFooter extends Component{

    static propTypes = {
        navList:PropTypes.array.isRequired
    }

    render(){
        let {navList} = this.props

        //过滤掉hide为true的nav
        navList = navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname//请求的path
        return(
            <div style={{position:'absolute',bottom:0,width:'100%'}} >
            <TabBar >
                {
                    navList.map((nav) => (
                        <Item key={nav.path}
                              title={nav.text }
                        icon={{uri:require(`./images/${nav.icon}.png`)}}
                        selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                        selected ={path === nav.path}
                        onPress={() => this.props.history.replace(nav.path)}/>
                    ))
                }
            </TabBar>
            </div>
        )
    }
}

export default withRouter(NavFooter)