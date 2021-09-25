/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AssignmentContext } from "./AssignmentProvider";
import { useHistory, useParams } from "react-router-dom";
import { CourseContext } from "../Classes/CourseProvider"
import "./Assignment.css"

export const AssignmentForm = () => {
  const {courses, getCourses} = useContext(CourseContext)
  const {addAssignment, updateAssignment, getAssignmentById} = useContext(AssignmentContext)
  const [filterCourses, setFiltered] = useState([])
  const currentUserId = sessionStorage.getItem("otoi_user")
  
  const [assignment, setAssignment] =useState({
    title: "",
    courseId: 0,
    userId: 0,
    dateGiven: "",
    dateDue: "",
    notes: "",
    status:""

  })

  const history =useHistory();
  const [isLoading, setIsLoading] =useState(true)

  const {assignmentId} = useParams()

  const handleControlledInputChange = (event) => {
    const newAssignment = { ...assignment };
    newAssignment[event.target.id] = event.target.value;
    setAssignment(newAssignment);
  };
  const handleClickSaveAssignment = (event) => {
    event.preventDefault()
    // const userId = parseInt(assignment.userId)
    // const courseId = parseInt(assignment.courseId)

      setIsLoading (true);
      if (assignment.id) {
        updateAssignment({
          id: assignment.id,
          userId: parseInt(assignment.userId),
          courseId: parseInt(assignment.courseId),
          title: assignment.title,
          dateGiven: assignment.dateGiven,
          dateDue: assignment.dateDue,
          notes: assignment.notes,
          status: assignment.status
          
        }).then(() => history.push(`/assignments/detail/${assignment.id}`));
      } else {
        addAssignment({
          userId: (parseInt(sessionStorage.getItem("otoi_user"))),
          courseId: parseInt(assignment.courseId),
          title: assignment.title,
          dateGiven: assignment.dateGiven,
          dateDue: assignment.dateDue,
          notes: assignment.notes,
          status: assignment.status
          
        }).then(() => history.push("/assignments"))
      }
    
      
      }

  
  useEffect(() => {
    getCourses().then(() => {
      if(assignmentId) {
        getAssignmentById(assignmentId).then((assignment) => {
          setAssignment(assignment)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

    const currentUserCourse = filterCourses.filter(course =>{   
      return course.userId === parseInt(currentUserId) 


    })

    useEffect(()=>{
      setFiltered(courses)
    }) 

  return (
    <form onSubmit={handleClickSaveAssignment} className = "assignmentSecList">
      <h2 className= "assignmentForm_title"> New Assignment</h2>
      <fieldset>
        <div className="form_group">
          <label htmlFor="title">Assignment Title</label>
          <input
            type="text"
            id="title"
            required
            autoFocus
            className="form-control"
            placeholder="Assignment title"
            value={assignment.title}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset >
      <fieldset>
        <div className="form-group">
          <label htmlFor="courseId" className="label_assignmentForm">
            {" "} Course: {" "}
            </label>
            <select
            course="courseId"
            id="courseId"
            className="form-control"
            value={assignment.courseId}
            onChange= {handleControlledInputChange}
            >
              <option value="0"> Select Course </option>
              {
                currentUserCourse.map((course) => (
                  
                  <option key={course.id} value={course.id}>
                    {course.name}
                    
                  </option>)
                )
              }
            </select>          
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="dateGiven"> Date Assigned:</label>
          <input 
          type="date"
          id= "dateGiven"
          required
          autoFocus
          className= "form-control"
          placeholder="Assignment Date Given"
          value={assignment.dateGiven} 
          onChange= {handleControlledInputChange}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="dateDue"> Date Due:</label>
          <input 
          type="date"
          id= "dateDue"
          required
          autoFocus
          className= "form-control"
          placeholder="Assignment Date Due"
          value={assignment.dateDue} 
          onChange= {handleControlledInputChange}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notes"> Assignment Notes: </label>
          <input
            type="text"
            id="notes"
            required
            autoFocus
            className="form-control"
            placeholder="Assignment Notes"
            onChange={handleControlledInputChange}
            defaultValue={assignment.notes}
          />
        </div>
      </fieldset>
      <div className="assignmentFormBtn">
        <button className="buttonDetail"
        disabled={isLoading}
        type="submit">
          {assignmentId ? <> Save Assignment </> : <> Add Assignment</>}
        </button>

        <button className="buttonDetail"
        onClick={() =>{
          history.push(`/assignments`)
        }}
        >
          Back to Assignments
        </button>

      </div>

    </form>
  )
}