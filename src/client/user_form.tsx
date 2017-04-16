import * as React from 'react'

export const UserForm = ({onUserAdded}) => {
  let firstName, lastName
  return (
    <div>
      <p>Add a new user:</p>
      <form>
        <input ref={node => {firstName = node}} type="text" placeholder="John" />
        <input ref={node => {lastName = node}} type="text" placeholder="Hancock" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}