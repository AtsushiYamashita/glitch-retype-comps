import * as React from 'react'

export const UserForm = ({onUserAdded}) => {
  let firstNameInput, lastNameInput
  return (
    <div>
      <p>Add a new user:</p>
      <form onSubmit={e => {
          e.preventDefault()
          onUserAdded({
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim()
          })
          firstNameInput.value = lastNameInput.value = ''
        }}>
        <input ref={node => {firstNameInput = node}} type="text" placeholder="John" />
        <input ref={node => {lastNameInput = node}} type="text" placeholder="Hancock" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}