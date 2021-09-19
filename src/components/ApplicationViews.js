import React from "react";
import { Route } from "react-router-dom";

import { AssignmentList } from "./Assignments/AssignmentList";
import { AssignmentProvider } from "./Assignments/AssignmentProvider";
// import { AssignmentSearch } from "./Assignments/AssignmentSearch"
import { AssignmentForm } from "./Assignments/AssignmentForm";
import { AssignmentDetail } from "./Assignments/AssignmentDetail";
import { AssignmentLate } from "./Assignments/AssignmentsPastDueView";

import { UserProvider } from "./Users/UserProvider";

import { CourseProvider } from "./Classes/CourseProvider";
import { CourseList } from "./Classes/CourseList";
import { CourseForm } from "./Classes/CourseForm";

import { SchoolProvider } from "./Schools/SchoolProvider";
import { SchoolList } from "./Schools/SchoolList";
import { SchoolForm } from "./Schools/SchoolForm";

import { TeacherProvider } from "./Teachers/TeacherProvider";

export const ApplicationViews = () => {
  return (
    <>
      <UserProvider>
        <TeacherProvider>
          <CourseProvider>
            <AssignmentProvider>
              <Route exact path="/">
                <AssignmentList />
              </Route>
              <Route exact path="/assignments">
               <AssignmentList />
              </Route>
              <Route exact path="/past">
               <AssignmentLate />
              </Route>
              <Route exact path="/assignments/create">
                <AssignmentForm />
              </Route>
              <Route exact path="/assignments/edit/:assignmentId(\d+)">
                <AssignmentForm />
              </Route>
              <Route exact path="/assignments/detail/:assignmentId(\d+)">
                <AssignmentDetail />
              </Route>
            </AssignmentProvider>
            <Route exact path="/courses">
              <CourseList />
            </Route>
            <Route exact path="/courses/create">
              <CourseForm />
            </Route>
            <Route exact path="/courses/edit/:courseId(\d+)">
              <CourseForm />
            </Route>
          </CourseProvider>
        </TeacherProvider>
      </UserProvider>

      <SchoolProvider>
        <Route exact path="/schools">
          <SchoolList />
        </Route>
        <Route exact path="/schools/create">
          <SchoolForm />
        </Route>
        <Route exact path="/schools/edit/:schoolId(\d+)">
          <SchoolForm />
        </Route>
      </SchoolProvider>
    </>
  );
};
