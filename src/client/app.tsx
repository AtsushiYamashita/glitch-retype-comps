import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { UserList } from "./user_list"

async function onUserAdded() { 
  await render()
}

async function render() {
  const resp = await fetch('/users')
  const users = await resp.json()
  ReactDOM.render(
    <UserList users={users} />,
    document.getElementById("users-container")
  )
}
  
render()