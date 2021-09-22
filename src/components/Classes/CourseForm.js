/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from "react";
import { CourseContext } from "./CourseProvider";
import { useHistory, useParams } from "react-router-dom";
import { TeacherContext} from "../Teachers/TeacherProvider"

export const CourseForm =()=>{
  const {teachers, getTeachers} =useContext(TeacherContext)
  const {addCourse, updateCourse, getCourseById} = useContext(CourseContext)

  const [course, setCourse] = useState({
    name: "",
    teacherId: 0,
    userId: 0
  })
  const history =useHistory();
  const [isLoading, setIsLoading] =useState(true)
  const{courseId} =useParams()

  const handleControlledInputChange = (e) => {
    const newCourse = { ...course };
    newCourse[e.target.id] = e.target.value;
    setCourse(newCourse);
  }
  const handleClickSaveCourse = (e) => {
    e.preventDefault()

    setIsLoading (true)
    if (course.id) {
      updateCourse({
        id: course.id,
        name: course.name,
        teacherId: parseInt(course.teacherId),
        userId: parseInt(course.userId)
      })
      .then(()=>{
        history.push(`/courses/detail/${course.id}`)
      })
    } else {
      addCourse({
        userId: (parseInt(sessionStorage.getItem("otoi_user"))),
        name: course.name,
        teacherId: parseInt(course.teacherId)
      })
      .then(() => history.push("/courses"))
    }
  }
  useEffect(() => {
    getTeachers().then(() => {
      if(courseId) {
        getCourseById(courseId).then((course) => {
          setCourse(course)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])
  
  return(
    <form onSubmit={handleClickSaveCourse}
    className="courseSecList">
      <h2 className="courseForm_title">New Course</h2>
      <fieldset>
      <div className="form_group">
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            id="name"
            required
            autoFocus
            className="form-control"
            placeholder="Course Name"
            value={course.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="teacherId" className="label_courseForm">
            {" "} 
            Teacher: {" "}
            </label>
            <select
            teacher="teacherId"
            id="teacherId"
            className="form-control"
            value={course.teacherId}
            onChange= {handleControlledInputChange}
            >
              <option value="0"> Select Teacher </option>
              {
                teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))
              }
            </select>          
        </div>
      </fieldset>
      <div className="courseFormBtn">
        <button className="btn btn-primary"
        disabled={isLoading}
        type="submit">
          {courseId ? <> Save Course </> : <> Add Course</>}
        </button>

        <button className="btn btn-primary returnBtn"
        onClick={() =>{
          history.push(`/courses`)
        }}
        >
          Back to Courses
        </button>

      </div>
    </form>
  )

}