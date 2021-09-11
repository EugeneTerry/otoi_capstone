import React from "react"
import { Route } from "react-router-dom"
import { AssignmentList } from "./Assignments/AssignmentList"
import { AssignmentProvider } from "./Assignments/AssignmentProvider"
import { AssignmentSearch } from "./Assignments/AssignmentSearch"
import { UserProvider } from "./Users/UserProvider"

export const ApplicationViews = () => {
  return (
    <>
    
    <UserProvider>
      <AssignmentProvider>
        <Route exact path="/">
          <AssignmentList/>
        </Route>
        <Route exact path="/assignments">
          <AssignmentSearch/>
          <AssignmentList/>
        </Route>
      </AssignmentProvider>
    </UserProvider>
    </>
  )
}