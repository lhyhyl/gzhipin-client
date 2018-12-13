import React,{Component} from "react"
import PropTypes from 'prop-types'
import {
    WingBlank,
    WhiteSpace,
    Card,
} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim  from 'rc-queue-anim'

class UserList extends Component{
    static propTypes = {
        userList:PropTypes.array.isRequired,
    }
    render(){
        const {userList} = this.props
        return(
            <div>

                <WingBlank style={{marginBottom:30,marginTop:5}}>

                    <QueueAnim type='scale'>

                        {
                            userList.map((user) => (
                                <div key={user._id}>
                                <WhiteSpace size="lg" />
                                <Card>
                                <Card.Header
                                    thumb={require(`../../assets/images/${user.header}.png`)}
                                    extra={<span>{user.username}</span>}
                            />
                            <Card.Body>
                            <div>
                                <p>职位：{user.post}</p>
                                {
                                    user.company ?  <p>公司：{user.company}</p>:null
                                }
                                {
                                    user.salary ?  <p>薪水：{user.salary}</p>:null
                                }

                                <p>描述：{user.info}</p>
                            </div>
                            </Card.Body>
                            </Card>
                            <WhiteSpace size="lg" />
                                </div>
                            ))
                        }
                    </QueueAnim>

                </WingBlank>
            </div>
        )
    }
}

export default withRouter(UserList)