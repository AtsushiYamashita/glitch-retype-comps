import * as React from 'react'

export class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {users: []}
  }
  
  async componentDidMount() {
    let users = await fetch('/users')
    this.setState({users})
  }
  
  render() {
    let {users} = this.state
    return users.map(user => <li>{user.firstName} {user.lastName}</li>)
  }
}