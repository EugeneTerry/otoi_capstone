import React, { useState, createContext } from "react"

export const AssignmentContext = createContext()

export const AssignmentProvider = (props) => {
    const [assignments, setAssignments] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const apiURL = "https://otoi-api.herokuapp.com"
   
    const getAssignments = async () => {
        const response = await fetch(`${apiURL}/assignments?_expand=course`)
        .then(res => res.json())
        
        const teacherPromises=(response.map(async(assignment)=> {
            const teacherId = assignment.course.teacherId
            const teacher = await fetch(`${apiURL}/teachers/${teacherId}`)
            .then(res => res.json())
            // const newAssignment ={...assignment}
            // newAssignment.teacher=teacherResponse

            return ({...assignment, teacher})
        }))
        const teacherAll = await Promise.all(teacherPromises)  
        
        setAssignments(teacherAll)
    }

    const getOneAssignment = async (assignmentId) => {
        const assignment = await fetch(`${apiURL}/assignments/${assignmentId}?_expand=course`)
        .then(res => res.json())
            const teacherId = assignment.course.teacherId
            const teacher = await fetch(`${apiURL}/teachers/${teacherId}`)
            .then(res => res.json())

            return ({...assignment, teacher})
     
    }


    const getAssignmentsByUserId = (userId) => {
        return fetch(`${apiURL}/assignments/${userId}`)
        .then(res => res.json())
    }

    const getAssignmentsByCourseId = (courseId) => {
      return fetch(`${apiURL}/assignments/${courseId}`)
      .then(res => res.json())
    }

    const markAsDone = assignmentId => {
        return fetch(`${apiURL}/assignments/${assignmentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: true})  
        })
        .then(getAssignments)
    }

    const markAsWorking = assignmentId => {
        return fetch(`${apiURL}/assignments/${assignmentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: false})  
        })
        .then(getAssignments)
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

    const updateAssignment = (assignmentToUpdate) => {
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

    const deleteAssignments = (assignmentId) => {
        return fetch((`${apiURL}/assignments/${assignmentId}`), {
            method: "DELETE"
        })
        .then(getAssignments)
    }


    return (
        <AssignmentContext.Provider value={{
          assignments, getAssignments, addAssignment, getAssignmentsByUserId, updateAssignment, getAssignmentById, deleteAssignments, getAssignmentsByCourseId,searchTerms, setSearchTerms, getOneAssignment, markAsDone, markAsWorking
        }}>
            {props.children}
        </AssignmentContext.Provider>
    )
}