import * as React from "react";

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class UserList extends React.Component<any, any> {
    constructor(props) {
      super(props)
      this.state = {users: []}
    }
  
    async componentDidMount() {
      const response = await fetch('/users')
      const users = response.json()
      this.setState({users})
    }
  
    render() {
      let {users} = this.state;
      return <div>{users}</div>
    }
}