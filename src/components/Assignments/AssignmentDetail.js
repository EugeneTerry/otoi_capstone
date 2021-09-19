/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AssignmentContext } from "./AssignmentProvider";
import { useParams, useHistory } from "react-router-dom";
import "./Assignment.css"

export const AssignmentDetail = () => {
  const { getOneAssignment, deleteAssignments } =
    useContext(AssignmentContext);
  const [assignment, setAssignment] = useState({course:{}});
  const history = useHistory();

  const { assignmentId } = useParams();


  useEffect(() => {
    getOneAssignment(assignmentId)
    .then((newAssignment)=>{
      setAssignment(newAssignment)
    })
  }, []);

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
        <div className="assignmentDetail__teacher">Teacher: <a href = {`${assignment.teacher?.email}`}>{assignment.teacher?.name}</a></div>
        {/* if this is undifined it skips the remaning chaining */}
        <div className="assignmentDetail__notes">Notes: {assignment.notes}</div>
        <div className="assignmentDetail__given">
          Date Assigned: {assignment.dateGiven}
        </div>
        <div className="assignmentDetail__due">
          Date Due: {assignment.dateDue}
        </div>
      </div>
      <div className="assignmentDetailBtn">
        <button className="buttonDetail"
          onClick={() => {
            history.push(`/assignments/edit/${assignmentId}`);
          }}
        >
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
