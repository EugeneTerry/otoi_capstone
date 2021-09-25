/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AssignmentContext } from "./AssignmentProvider";
import "./Assignment.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const AssignmentList = () => {
  const {
    assignments,
    getAssignments,
    markAsDone,
    markAsWorking,
    searchTerms,
  } = useContext(AssignmentContext);
  const currentUserId = sessionStorage.getItem("otoi_user");
  const [filteredAssignments, setFiltered] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAssignments();
  }, []);

  const { setSearchTerms } = useContext(AssignmentContext);
  const currentUserAssignment = filteredAssignments.filter((assignment) => {
    return assignment.userId === parseInt(currentUserId);
  });

  useEffect(() => {
    setSearchTerms("");
  }, []);

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = assignments.filter(
        (assignment) =>
          assignment.title.toLowerCase().includes(searchTerms.toLowerCase()) ||
          assignment.course.name
            .toLowerCase()
            .includes(searchTerms.toLowerCase()) ||
          assignment.notes.toLowerCase().includes(searchTerms.toLowerCase())
      );
      setFiltered(subset);
    } else {
      setFiltered(assignments);
    }
  }, [searchTerms, assignments]);

  return (
    <>
      <div className="component-wrapper">
        <section className="assignmentSectionList">
          <div className="assignmentSearch">
            <h2 className="assignmentDivList">Assignments</h2>
            <input
              type="text"
              className="input--wide"
              onKeyUp={(e) => setSearchTerms(e.currentTarget.value)}
              placeholder="🔍"
            />
          </div>
          <div className="cardContainer">
          {currentUserAssignment.map((assignment) => {
            return (
              <div
                className="assignmentCards"
                key={`assignmentDivList=${assignment.id}`}
              >
                <Link
                  to={`/assignments/detail/${assignment.id}`}
                  key={assignment.id}
                  className="linkTitleAssignmentList"
                >
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
                  Done: {assignment.status}
                </div>
                <div>
                  <div className="statusCheck">
                    {assignment.status ? (
                      <button
                        className="mark-done"
                        onClick={() => {
                          markAsWorking(assignment.id).then(() =>
                            history.push("/assignments")
                          );
                        }}
                      >
                        👍
                      </button>
                    ) : (
                      <button
                        className="mark-working"
                        onClick={() => {
                          markAsDone(assignment.id).then(() =>
                            history.push("/assignments")
                          );
                        }}
                      >
                        👎
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
          <div>
            <button
              className="button-34"
              onClick={() => history.push("/assignments/create")}
            >
              Add New Assignment
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
