import React, {useEffect, useContext, useState} from "react";
import { usehistory, Link} from "react-router-dom"
import { AssignmentContext } from "./AssignmentProvider";
import "./Assignment.css"

export const AssignmentList = () => {
  const {assignments, getAssignments, searchTerms} = useContext(AssignmentContext)
  const currentUser = (parseInt(sessionStorage.getItem("otoi_user")))
  const [setFiltered] = useState ([])
  const history = usehistory()

  useEffect(() => {
    getAssignments()
  }, [])

  const filteredAssignments = assignments.filter(assignments => assignments.userId === currentUser)

  const {setSearchTerms} = useContext(AssignmentContext)

  useEffect(() => {setSearchTerms("")}, [])

  useEffect(() => {
    if(searchTerms !=="") {
      const subset = assignments.filter(assignment => assignments.title.toLowerCase().includes(searchTerms.toLowerCase()) || assignments.classId.toLowerCase().includes(searchTerms.toLowerCase()) || assignments.classId.teacherId.toLowerCase().includes(searchTerms.toLowerCase()) || assignments.notes.toLowerCase().includes(searchTerms.toLowerCase()))
      setFiltered(subset)
    } else {
      setFiltered(assignments)
    }
    }, [searchTerms, assignments])

  return (
    <>
      <div className="assignmentDivList">
        <section className="assignmentSectionList">
          <div className="assignmentSearch">Assignments
            <input type="text"
            className="input--wide"
            onKeyUp={(e) => setSearchTerms(e.currentTarget.value)}
            placeholder="🔍" />
          </div>
          {filteredAssignments.map((assignment) => {
            return (
              <div className="linkDivAssignmentList"
                key={`assignmentDivList=${assignment.id}`}>
                <Link to={`/assignments/detail/${assignment.id}`}
                  key={assignment.id}
                  className="linkTitleAssignmentList">
                  Title:{assignment.title}
                </Link>
                <div
                  key={`assignmentClassList_${assignment.id}`}
                  className="assignmentClassListInfo"
                >
                  Class: {assignment.classId.name}
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
                  Started: {assignment.started}
                </div>
                <div
                  key={`assignmentFinishedList__${assignment.id}`}
                  className="assignmentFinishedListInfo"
                >
                  Started: {assignment.finished}
                </div>
                
              </div>
            )
          })}
          <button className="assignmentBtn" onclick={() => history.push("/assignments/create")}>Add New Assignment</button>
          
        </section>
      </div>
    </>
  )


}