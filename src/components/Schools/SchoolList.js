import React, {useEffect, useContext} from "react";
import { SchoolContext } from "./SchoolProvider";

export const SchoolList = () => {
  const {schools, getSchools} = useContext
  (SchoolContext)

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
                <div className="school__name">{school.name}</div>
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}