/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import { SchoolContext } from "./SchoolProvider";
import "./School.css"

export const SchoolList = () => {
  const {schools, getSchools} = useContext
  (SchoolContext)
  const currentUserId = sessionStorage.getItem("otoi_user")
  const history= useHistory()
  const [filterSchools, setFiltered] = useState([])

  useEffect(() => {
    getSchools()
  }, [])

  const currentUserSchool = filterSchools.filter(school =>{
    return school.userId === parseInt(currentUserId)
  })

  useEffect(()=>{
    setFiltered(schools)
  }) 

  return(
    <>
      <div className="schoolDiv">
        <section className="schoolSec">
          <h2>Schools</h2>
          {currentUserSchool.map((school) =>{
            return(
              <div className="schoolName" key ={`school--${school.id}`}>
                <div className="school__name">School Name: {school.name}</div>
              </div>
            )
          })}
          <button className="button-34" onClick={() => history.push("/schools/create")}>Add New School</button>
        </section>
      </div>
    </>
  )
}