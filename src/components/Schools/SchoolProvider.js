import React, { useState, createContext } from "react";

export const SchoolContext = createContext();

export const SchoolProvider = (props) => {
  const [schools, setSchools] = useState([]);
  const apiURL = "http://localhost:8088";

  const getSchools = () => {
    return fetch(`${apiURL}/schools`)
      .then((res) => res.json())
      .then(setSchools);
  };

  const getSchoolById = async (schoolId) => {
    const res = await fetch(`${apiURL}/schools/${schoolId}`)
  return await res.json()
}

  const addSchool = async (school) => {
    const res = await fetch(`${apiURL}/schools`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(school),
    });
    return await res.json();
  };
  return (
    <SchoolContext.Provider
      value={{
        schools,
        getSchools,
        addSchool,
        getSchoolById
      }}
    >
      {props.children}
    </SchoolContext.Provider>
  );
};
