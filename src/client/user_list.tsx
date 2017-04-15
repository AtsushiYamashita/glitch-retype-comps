import * as React from 'react'

export const UserList = () => {
  let users
  ;(async () => {
    users = await fetch('/users')
  })()
  return (
    users.map(user => {
      return <li>{user.firstName} {user.lastName}</li>  
    })
  )
}