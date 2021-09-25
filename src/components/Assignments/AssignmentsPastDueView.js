/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState} from "react";
import { useHistory, Link} from "react-router-dom"
import { AssignmentContext } from "./AssignmentProvider";
// import { AssignmentList } from "./AssignmentList";
import "./Assignment.css"



export const AssignmentLate = () => {
  const {assignments, getAssignments} = useContext(AssignmentContext)
  const [filteredLate, setFilteredLate] = useState ([])
  const history = useHistory()

  useEffect(() => {
    getAssignments()
  }, [])

  const overdueAssignments = filteredLate.filter(assignment => {
    return new Date(assignment.dateDue) - new Date() < 0
  })

    useEffect(()=>{
      setFilteredLate(assignments)
    })

  return (
    <>
      <div className="component-wrapper"><h2>Past Due Assignments</h2>
        <section className="cardContainer">
          
          {overdueAssignments.map((assignment) => {

            
            //create an if statement here for status
            return (
              
              <div className="assignmentCards"
                key={`assignmentDivList=${assignment.id}`}>
                <Link to={`/assignments/detail/${assignment.id}`}
                  key={assignment.id}
                  className="linkTitleAssignmentList">
                  Title:{assignment.title}
                </Link>
                <div
                  key={`assignmentCourseList_${assignment.id}`}
                  className="assignmentCourseListInfo"
                >
                  Course: {assignment.course.name}
                </div>
                <div
                  key={`assignmentNotesList__${assignment.id}`}
                  className="assignmentNotesListInfo"
                >
                  Notes: {assignment.notes}
                </div>
                <div
                  key={`assignmentDateList__${assignment.id}`}
                  className="assignmentDateListInfo"
                >
                  Date Assigned: {assignment.dateGiven}
                </div>
                <div
                  key={`assignmentDueList__${assignment.id}`}
                  className="assignmentDueListInfo"
                >
                  Date Due: {assignment.dateDue}
                </div>
                <div
                  key={`assignmentStartedList__${assignment.id}`}
                  className="assignmentStartedListInfo"
                >
                  Days Overdue: {Math.floor((new Date() - new Date(assignment.dateDue))/ (1000 * 60 * 60 * 24))}
                </div>
              </div>
            )
          })}
          
        </section>
          <button className="button-34" onClick={() => history.push("/assignments/create")}>Add New Assignment</button>

          <button
          className="buttonDetail"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to Assignments
        </button>
      </div>
    </>
  )


}