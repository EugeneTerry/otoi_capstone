/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState} from "react";
import { CourseContext } from "./CourseProvider";
import { useHistory } from "react-router-dom";
import "./Course.css"

export const CourseList = () => {
  const {courses, getCourses} = useContext(CourseContext)
  const currentUserId = sessionStorage.getItem("otoi_user")
  const history= useHistory()
  const [filterCourses, setFiltered] = useState([])

  useEffect (() => {
    getCourses()
  }, [])

  const currentUserCourse = filterCourses.filter(course =>{
    return course.userId === parseInt(currentUserId)
  })

  useEffect(()=>{
    setFiltered(courses)
  }) 

  return (
    <>
      <div className="courseDivList"><h2>Courses</h2>
        <section
        className="courses">          
          {currentUserCourse.map((course) =>{
            return(
              <div className="course" key = {`course--${course.id}`}>
                <div className="course__name">{course.name}</div>
                <div className="course__teacherName">{course.teacherId.name}</div>
              </div>
            )
          })}
          
        </section>
      </div>
      <button className="button-34" onClick={() => history.push("/courses/create")}>Add New Course</button>
    </>
  )
}