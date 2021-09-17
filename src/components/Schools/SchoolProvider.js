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

  const addSchool = (school) => {
    return fetch(`${apiURL}/schools`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(school),
    }).then((res) => res.json());
  };
  return (
    <SchoolContext.Provider
      value={{
        schools,
        getSchools,
        addSchool,
      }}
    >
      {props.children}
    </SchoolContext.Provider>
  );
};
