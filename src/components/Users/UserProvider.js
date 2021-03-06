import React, {createContext, useState} from "react";

export const UserContext = createContext()
export const UserProvider = (props) => {
  const[users, setUsers] = useState([])
  const apiURL = "https://otoi-api.herokuapp.com"

  const getUsers = () => {
    return fetch(`${apiURL}/users`)
    .then(res => res.json())
    .then(setUsers)
  }
  return (
    <UserContext.Provider value = {{users, getUsers}}>
      {props.children}
    </UserContext.Provider>
  )
}