/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AssignmentContext } from "./AssignmentProvider";
import { useParams, useHistory } from "react-router-dom";
import "./Assignment.css"

export const AssignmentDetail = () => {
  const { getOneAssignment, deleteAssignments, markAsWorking, markAsDone, assignments } =
    useContext(AssignmentContext);
  const [assignment, setAssignment] = useState({course:{}});
  const history = useHistory();

  const { assignmentId } = useParams();


  useEffect(() => {
    getOneAssignment(assignmentId)
    .then((newAssignment)=>{
      setAssignment(newAssignment)
    })
  }, [assignments]);

  const handleRelease = () => {
    deleteAssignments(assignment.id).then(() => {
      history.push("/assignments");
    });
  };


  return (
    <section className="assignmentSecList">
      <h3 className="assignmentDetail__title">{assignment.title}</h3>
      <div className="assignmentCards">
        <div className="assignmentDetail__course">
          Course: {assignment.course.name}
        </div>
        <div className="assignmentDetail__teacher">Teacher: {assignment.teacher?.name}</div>
        {/* if this is undifined it skips the remaning chaining */}
        <div className="assignmentDetail__email">
          Email: {assignment.teacher?.email}
        </div>
        <div className="assignmentDetail__notes">Notes: {assignment.notes}</div>
        <div className="assignmentDetail__given">
          Date Assigned: {assignment.dateGiven}
        </div>
        <div className="assignmentDetail__due">
          Date Due: {assignment.dateDue}
        </div>
        <div> Done: {assignment.status}
        <div className="statusCheck">
                    {assignment.status?
                    <button className="mark-as-done" onClick={()=>{
                      markAsWorking(assignment.id)
                      .then(()=> history.push(`/assignments/detail/${assignment.id}`))}}>
                        👍
                      </button>: 
                      <button className="mark-As-working" onClick={()=> {markAsDone(assignment.id)
                      .then(()=> history.push(`/assignments/detail/${assignment.id}`))}}>👎</button>}
                  </div>
         </div>
      </div>
      

      <div className="assignmentDetailBtn">
        <button className="buttonDetail"
          onClick={() => {
            history.push(`/assignments/edit/${assignmentId}`);
          }}>
          Edit
        </button>

        <button className="buttonDetail" onClick={handleRelease}>
          {" "}
          Delete Assignment
        </button>
        
        <button
          className="buttonDetail"
          onClick={() => {
            history.push("/assignments/create/");
          }}
        >
          New Assignment
        </button>

        <button
          className="buttonDetail"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to Assignments
        </button>
      </div>
    </section>
  );
};
