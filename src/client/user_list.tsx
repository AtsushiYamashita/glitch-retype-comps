import * as React from "react";

export const UserList = ({users}) => (
  <div>
    <p>Users:</p>
    <ul>
      {users.map(user => (
        <li>{user[0]} {user[1]}</li>
      ))}
    </ul>
  </div>
)