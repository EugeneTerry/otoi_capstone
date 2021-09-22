/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import { TeacherContext } from "./TeacherProvider";
import "./Teacher.css"

export const TeacherList =()=>{
  const {teachers, getTeachers, deleteTeachers} =useContext(TeacherContext)
  const currentUserId = sessionStorage.getItem("otoi_user")
  const history= useHistory()
  const [filterTeachers, setFiltered] = useState([])
  

  useEffect(() => {
    getTeachers()
  }, [])

  const currentUserTeacher = filterTeachers.filter(teacher =>{
    return teacher.userId === parseInt(currentUserId)
  })


  useEffect(()=>{
    setFiltered(teachers)
  }) 

  const handleRelease = (teacherId) => {
    deleteTeachers(teacherId).then(() => {
      history.push("/teachers");
    });
  };

  return(
    <>
      <div className="teacherDiv">
        <section className="teacherSec">
          <h2>Teachers</h2>
          {currentUserTeacher.map((teacher) =>{
            return(
              <div className="teacherCards" key ={`teacher--${teacher.id}`}>
                <div className="teacher__name"><b> {teacher.name}</b></div>
                <div className="teacher__email">Email: {teacher.email}</div>
                <div className="teacher__name">School: {teacher.school.name}</div>
                Delete:
                <button className="smallButtonDetail" onClick={()=>handleRelease(teacher.id)}>{" "}
                  X
                </button>
              </div>                           
            )
          })}
          <button className="button-34" onClick={() => history.push("/teachers/create")}>Add New Teacher</button>
        </section>
      </div>
    </>
  )














}