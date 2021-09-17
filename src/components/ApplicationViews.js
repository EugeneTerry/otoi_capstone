import React from "react"
import { Route } from "react-router-dom"
import { AssignmentList } from "./Assignments/AssignmentList"
import { AssignmentProvider } from "./Assignments/AssignmentProvider"
import { AssignmentSearch } from "./Assignments/AssignmentSearch"
import { UserProvider } from "./Users/UserProvider"
import { AssignmentForm } from "./Assignments/AssignmentForm"
import { CourseProvider } from "./Classes/CourseProvider"
import { CourseList } from "./Classes/CourseList"
import { SchoolProvider } from "./Schools/SchoolProvider"
import { SchoolList } from "./Schools/SchoolList"

export const ApplicationViews = () => {
  return (
    <>
    
    <UserProvider>
      <CourseProvider>
      <AssignmentProvider>
        <Route exact path="/">
          <AssignmentList/>
        </Route>
        <Route exact path="/assignments">
          <AssignmentSearch/>
          <AssignmentList/>
        </Route>
        <Route exact path="/assignments/create">
        <AssignmentForm/>
      </Route>
      <Route exact path="/assignments/edit/:assignmentId(\d+)">
        <AssignmentForm/>
      </Route>
      </AssignmentProvider>

      <Route exact path="/courses"> 
        <CourseList/>
      </Route>
      </CourseProvider>
    </UserProvider>

    <SchoolProvider>
      <Route exact path ="/schools">
        <SchoolList/>
      </Route>
    </SchoolProvider>
    </>
  )
}