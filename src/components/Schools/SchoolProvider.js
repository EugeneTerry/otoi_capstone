import React, { useState, createContext } from "react";

export const SchoolContext = createContext();

export const SchoolProvider = (props) => {
  const [schools, setSchools] = useState([]);
  const apiURL = "https://otoi-api.herokuapp.com";

  const getSchools = () => {
    return fetch(`${apiURL}/schools`)
      .then((res) => res.json())
      .then(setSchools);
  };

  const getSchoolById = async (schoolId) => {
    const res = await fetch(`${apiURL}/schools/${schoolId}`)
  return await res.json()
}

  const addSchool = async school => {
    const response = await fetch(`${apiURL}/schools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(school),
    });
    return await response.json();
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
