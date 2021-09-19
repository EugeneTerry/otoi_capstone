import React, { useState, createContext } from "react";

export const CourseContext = createContext();

export const CourseProvider = (props) => {
  const [courses, setCourses] = useState([]);
  const apiURL = "http://localhost:8088";

  const getCourses = () => {
    return fetch(`${apiURL}/courses`)
      .then((res) => res.json())
      .then(setCourses);
  };

  const getCourseById = async (courseId) => {
    const res = await fetch(`${apiURL}/courses/${courseId}`)
  return await res.json()
}

  const getCoursesByTeacherId = (teacherId) => {
    return fetch(`${apiURL}/courses/${teacherId}`).then((res) => res.json());
  };

  const addCourse = (course) => {
    return fetch(`${apiURL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    }).then((response) => response.json());
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        addCourse,
        getCoursesByTeacherId,
        getCourses,
        getCourseById
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};
