import * as React from "react";

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class UserList extends React.Component<any, any> {
    constructor(props) {
      super(props)
      this.state = {users: []}
      console.log(props)
    }
  
    async componentDidMount() {
      const response = await fetch('/users')
      const users = await response.json()
      this.setState({users: users})
    }
  
    render() {
      let {users} = this.state
      return (
        <div>
          <p>Users:</p>
          <ul>
            {users.map(user => (
              <li>{user[0]} {user[1]}</li>
            ))}
          </ul>
        </div>
      );
    }
}