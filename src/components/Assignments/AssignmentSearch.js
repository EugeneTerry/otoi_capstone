/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react"
import { AssignmentContext } from "./AssignmentProvider"
import"./Assignment.css"

export const AssignmentSearch =() => {
  const {setSearchTerms} = useContext(AssignmentContext)
  
  useEffect(() => {setSearchTerms("")}, []) 

  return (
    <>
      <div className ="assignmentSearch"> Assignment Search
        <input type = "text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.currentTarget.value)}
        placeholder="🔍."/>
      </div>
    </>
  )
}