/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { SchoolContext } from "./SchoolProvider";

export const SchoolList = () => {
  const {schools, getSchools} = useContext
  (SchoolContext)
  const history= useHistory()

  useEffect(() => {
    getSchools()
  }, [])

  return(
    <>
      <div className="schoolDivList">
        <section className="schools">
          <h2>Schools</h2>
          {schools.map((school) =>{
            return(
              <div className="school" id ={`school--${school.id}`}>
                <div className="school__name">School Name: {school.name}</div>
              </div>
            )
          })}
          <button className="schoolBtn" onClick={() => history.push("/schools/create")}>Add New School</button>
        </section>
      </div>
    </>
  )
}