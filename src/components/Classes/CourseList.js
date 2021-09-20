/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from "react";
import { CourseContext } from "./CourseProvider";
import { useHistory } from "react-router-dom";
import "./Course.css"

export const CourseList = () => {
  const {courses, getCourses} = useContext(CourseContext)
  const history= useHistory()

  useEffect (() => {
    getCourses()
  }, [])

  return (
    <>
      <div className="courseDivList">
        <section
        className="courses">
          <h2>Courses</h2>
          {courses.map((course) =>{
            return(
              <div className="course" key = {`course--${course.id}`}>
                <div className="course__name">{course.name}</div>
                <div className="course__teacherName">{course.teacherId.name}</div>
              </div>
            )
          })}
          <button className="button-34" onClick={() => history.push("/courses/create")}>Add New Course</button>
        </section>
      </div>
    </>
  )
}