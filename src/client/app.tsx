import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Hello } from "./hello"
import { UserList } from "./user_lsit"

let users

;(async () => {
  users = await fetch('/users')
})()

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
)