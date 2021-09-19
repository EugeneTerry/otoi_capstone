/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState} from "react";
import { useHistory, Link} from "react-router-dom"
import { AssignmentContext } from "./AssignmentProvider";
import "./Assignment.css"

export const AssignmentLate = () => {
  const {assignments, getAssignments, searchTerms} = useContext(AssignmentContext)
  const currentUserId = sessionStorage.getItem("otoi_user")
  const [filteredAssignments, setFiltered] = useState ([])
  const [filteredLate, setFilteredLate] = useState ([])
  const history = useHistory()

  useEffect(() => {
    getAssignments()
  }, [])

  
  const currentUserAssignment = filteredAssignments.filter(assignment => {
    return assignment.userId === parseInt(currentUserId)
  })

  const overdueAssignments = filteredLate.filter(assignment => {
    return assignment.dateDue === assignment.dateGiven
  })

  

  useEffect(() => {
    
      setFiltered(assignments)
    }, [searchTerms, assignments])

    useEffect(()=>{
      setFilteredLate(assignments)
    })

  return (
    <>
      <div className="assignmentDivList"><h2>Past Due Assignments</h2>
        <section className="assignmentSectionList">
          
          {currentUserAssignment.map((assignment) => {

            const status = assignment.started; 
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
                  Status: {status}
                </div>
              </div>
            )
          })}
          <button className="button-34" onClick={() => history.push("/assignments/create")}>Add New Assignment</button>
          
        </section>
      </div>
    </>
  )


}