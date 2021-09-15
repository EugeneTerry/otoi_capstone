import React, { useState, createContext } from "react";

export const TeacherContext = createContext();

export const TeacherProvider = (props) => {
  const [teachers, setTeachers] = useState([]);
  const apiURL = "http://localhost:8088";

  const getTeachers = () => {
    return fetch(`${apiURL}/teachers?_expand=schools`)
      .then((res) => res.json())
      .then(setTeachers);
  };
  const getTeacherById = (teacherId) => {
    return fetch(`${apiURL}/teachers/${teacherId}`).then((res) => res.json());
  };

  const addTeacher = (teacherObj) => {
    return fetch(`${apiURL}/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherObj),
    })
      .then((res) => res.json()
      .then(getTeachers));
  };
    return (
      <TeacherContext.Provider value ={{
        teachers, addTeacher, getTeacherById, getTeachers
      }}>
        {props.children}
      </TeacherContext.Provider>
    )
};
