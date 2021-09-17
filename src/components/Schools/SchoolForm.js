import React, {useState, useEffect, useContext} from "react";
import { useHistory, useParams } from "react-router-dom";
import { SchoolContext } from "./SchoolProvider";

export const SchoolForm = () => {
  const {addSchool, updateSchool, getSchoolById} =useContext(SchoolContext)

  const[school, setSchool] =useState({
    name: ""

  })
  const history=useHistory();
  const [isLoading, setIsLoading] =useState(true)

  const{schoolId} =useParams()

  const handleControlInputChange = (e) => {
    const newSchool = { ...school }
    newSchool[e.target.Id] = e.target.value
    setSchool(newSchool)
  }
  const handleClickSaveSchool = (e) => {
    e.preventDefault()
    
    setIsLoading (true)
    if(school.id) {
      updateSchool({
        id: school.id,
        name: school.name
      }).then(() => history.push(`/schools/detail/${school.id}`))
    } else{
      addSchool({
        name: school.name
      }).then(() => history.push("/schools"))
    }
  }
   useEffect(() => {
     if(schoolId) {
       getSchoolById(schoolId).then((school) => {
         setSchool(school)
         setIsLoading(false)
       })
     } else {
       setIsLoading(false)
     }
   }, [])

  return(
    <form onSubmit={handleClickSaveSchool}
    className ="schoolSecList">
      <h2 className="schoolForm_title">New School</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor ="name">Input School Name</label>
          <input type="text"
          id="name"
          required
          autoFocus
          className="form-control"
          placeholder="School name"
          onChange={handleControlInputChange}
          defaultValue={school.name}/>
        </div>
      </fieldset>
      <div className="schoolFormBtn">
        <button className="btn btn-primary" disabled={isLoading} type='submit'>
          {schoolId ? <> Save School</> : <> Add School</>}
        </button>

        <button className="btn btn-primary returnBtn" onClick={() => {
        history.push(`/schools`)
      }}>Back to Schools</button>

      </div>
    </form>
  )
}