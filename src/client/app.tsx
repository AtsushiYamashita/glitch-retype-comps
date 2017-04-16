import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { UserForm } from './user_form'
import { UserList } from './user_list'

async function onUserAdded({firstName, lastName}) {
  await fetch(`/users?firstName=${firstName}&lastName=${lastName}`, {
    method: 'POST'
  })
  await render()
}

async function render() {
  const resp = await fetch('/users')
  const users = await resp.json()
  ReactDOM.render(
    <UserForm onUserAdded={onUserAdded} />,
    document.getElementById('users-form')
  )
  ReactDOM.render(
    <UserList users={users} />,
    document.getElementById('users-container')
  )
}
  
render()