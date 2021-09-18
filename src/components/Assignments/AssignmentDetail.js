import React, { useContext, useEffect, useState } from "react";
import { AssignmentContext } from "./AssignmentProvider";
import { useParams, useHistory } from "react-router-dom";

export const AssignmentDetail = () => {
  const { assignments, getAssignments, deleteAssignments } =
    useContext(AssignmentContext);
  const [assignment, setAssignment] = useState({course:{}});
  const history = useHistory();

  const { assignmentId } = useParams();

  useEffect(() => {
    getAssignments().then(() => {
      const thisAssignment = assignments.find(
        (a) => a.id === parseInt(assignmentId)
      ) || {course: {}};
      setAssignment(thisAssignment);
    });
  }, [assignmentId]);

  const handleRelease = () => {
    deleteAssignments(assignment.id).then(() => {
      history.push("/assignments");
    });
  };

  useEffect(() => {
    if(assignment) {
      setAssignment(assignment)
    } else {
      const thisAssignment = assignments.find((a) =>a.id === parseInt(assignmentId))
      setAssignment(thisAssignment)
    }

  }, [assignmentId])



  return (
    <section className="assignmentSecList">
      <h3 className="assignmentDetail__title">{assignment.title}</h3>
      <div className="assignmentDetail__course">
        Course: {assignment.course.name}
      </div>
      <div className="assignmentDetail__notes">Notes: {assignment.notes}</div>
      <div className="assignmentDetail__given">
        Date Assigned: {assignment.dateGiven}
      </div>
      <div className="assignmentDetail__due">
        Date Due: {assignment.dateDue}
      </div>
      <div className="assignmentDetailBtn">
        <button
          onClick={() => {
            history.push(`/assignments/edit/${assignmentId}`);
          }}
        >
          Edit
        </button>
        <button className="deleteBtn" onClick={handleRelease}>
          {" "}
          Delete Assignment
        </button>
        <button
          className="assignmentCreateBtn"
          onClick={() => {
            history.push("/assignments/create/");
          }}
        >
          New Assignment
        </button>
        <button
          className="assignmentsBtn"
          onClick={() => {
            history.push("/assignments");
          }}
        >
          Back to Assignments
        </button>
      </div>
    </section>
  );
};
