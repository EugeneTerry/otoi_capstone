import React, {useEffect, useContext} from "react";
import { CourseContext } from "./CourseProvider";
import "./Course.css"

export const CourseList = () => {
  const {courses, getCourses} = useContext(CourseContext)

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
              <div className="course" id = {`course--${course.id}`}>
                <div className="course__name">{course.name}</div>
                <div className="course__teacherName">{course.teacherId.name}</div>
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}