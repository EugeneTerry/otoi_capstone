/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import { TeacherContext } from "./TeacherProvider";
import "./Teacher.css"
import styled from "styled-components";

const DeleteButton=styled.button`
  background-color: red !important;

`

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
      <div className="component-wrapper">
          <h2>Teachers</h2>
        <section className="cardContainer">
          {currentUserTeacher.map((teacher) =>{
            return(
              <div className="teacherCards" key ={`teacher--${teacher.id}`}>
                <div className="teacher__name"><b> {teacher.name}</b></div>
                <div className="teacher__email">Email: {teacher.email}</div>
                <div className="teacher__name">School: {teacher.school.name}</div>
              
                <DeleteButton className="smallButtonDetail" onClick={()=>handleRelease(teacher.id)}>{" "}
                🗑️
                </DeleteButton>
              </div>                           
            )
          })}
        </section>
          <button className="button-34" onClick={() => history.push("/teachers/create")}>Add New Teacher</button>
      </div>
    </>
  )














}