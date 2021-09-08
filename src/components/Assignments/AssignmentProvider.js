import React, { useState, createContext } from "react"

export const AssignmentContext = createContext()

export const AssignmentProvider = (props) => {
    const [assignments, setAssignments] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const apiURL = "http://localhost:8088"
   
    const getAssignments = () => {
        return fetch(`${apiURL}/assignments?_expand=class`)
        .then(res => res.json())
        .then(setAssignments)
    }

    const getAssignmentsByUserId = (userId) => {
        return fetch(`${apiURL}/assignments/${userId}`)
        .then(res => res.json())
    }

    const getAssignmentsByClassId = (classId) => {
      return fetch(`${apiURL}/assignments/${classId}`)
      .then(res => res.json())
  }

    const addAssignment = async assignment => {
        const response = await fetch(`${apiURL}/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(assignment)
      })
      return await response.json()
    }

    const updateAssignment = assignmentToUpdate => {
        return fetch((`${apiURL}/assignments/${assignmentToUpdate.id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(assignmentToUpdate)
        })
            .then(getAssignments)
    }

    const getAssignmentById = async (assignmentId) => {
        const res = await fetch(`${apiURL}/assignments/${assignmentId}`)
      return await res.json()
    }

    const deleteAssignment = (assignmentId) => {
        return fetch((`${apiURL}/assignments/${assignmentId}`), {
            method: "DELETE"
        })
        .then(getAssignments)
    }


    return (
        <AssignmentContext.Provider value={{
          assignments, getAssignments, addAssignment, getAssignmentsByUserId, updateAssignment, getAssignmentById, deleteAssignment, getAssignmentsByClassId,searchTerms, setSearchTerms
        }}>
            {props.children}
        </AssignmentContext.Provider>
    )
}