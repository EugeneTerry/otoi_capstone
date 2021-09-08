import React, { useState, createContext } from "react"

export const ClassContext = createContext()

export const ClassProvider = (props) => {
  const [classes, setClasses] = useState([])
  const apiURL = "http://localhost:8088"

  const getClassess = () => {
    return fetch(`${apiURL}/classes`)
    .then(res => res.json())
    .then(setClasses)
  }

  const getClassesByTeacherId = (teacherId) => {
    return fetch(`${apiURL}/classes/${teacherId}`)
    .then(res => res.json())
  }

  const addClass = class => {
    return fetch(`${apiURL}/classes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
}


}