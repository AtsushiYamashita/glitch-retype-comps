import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { UserList } from "./user_list"

ReactDOM.render(
    <UserList compiler="TypeScript" framework="React" />,
    document.getElementById("example")
)