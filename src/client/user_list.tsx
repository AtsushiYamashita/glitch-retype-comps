import * as React from "react";

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class UserList extends React.Component<any, any> {
    constructor(props) {
      super(props)
      this.state = {users: []}
    }
  
    async componentDidMount() {
      let users = await fetch('/users')
      this.setState({})
    }
  
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}