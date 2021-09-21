/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { TeacherContext } from "./TeacherProvider";
import { useHistory, useParams } from "react-router-dom";
import { SchoolContext } from "../Schools/SchoolProvider";

export const TeacherForm = () => {
  const { schools, getSchools } = useContext(SchoolContext);
  const { addTeacher, updateTeacher, getTeacherById } =
    useContext(TeacherContext);

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    schoolId: 0,
    userId: 0,
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const { teacherId } = useParams();

  const handleControlledInputChange = (e) => {
    const newTeacher = { ...teacher };
    newTeacher[e.target.id] = e.target.value;
    setTeacher(newTeacher);
  };
  const handleClickSaveTeacher = (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (teacher.id) {
      updateTeacher({
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        schoolId: parseInt(teacher.schoolId),
        userId: parseInt(teacher.userId),
      }).then(() => {
        history.push(`/teachers/detail/${teacher.id}`);
      });
    } else {
      addTeacher({
        userId: parseInt(sessionStorage.getItem("otoi_user")),
        name: teacher.name,
        email: teacher.email,
        schoolId: parseInt(teacher.schoolId),
      }).then(() => history.push("/teachers"));
    }
  };
  useEffect(() => {
    getSchools().then(() => {
      if (teacherId) {
        getTeacherById(teacherId).then((teacher) => {
          setTeacher(teacher);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <form onSubmit={handleClickSaveTeacher} className="teacherSecList">
      <h2 className="teacherForm_title">New Teacher</h2>
      <fieldset>
        <div className="form_group">
          <label htmlFor="name">Teacher Name</label>
          <input
            type="text"
            id="name"
            required
            autoFocus
            className="form-control"
            placeholder="Teacher Name"
            value={teacher.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form_group">
          <label htmlFor="email">Teacher Email</label>
          <input
            type="text"
            id="email"
            required
            autoFocus
            className="form-control"
            placeholder="Teacher Email"
            value={teacher.email}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="schoolId" className="label_teacherForm">
            {" "}
            School:{" "}
          </label>
          <select
            school="schoolId"
            id="schoolId"
            className="form-control"
            value={teacher.schoolId}
            onChange={handleControlledInputChange}
          >
            <option value="0"> Select School </option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <div className="teacherFormBtn">
        <button className="btn btn-primary" disabled={isLoading} type="submit">
          {teacherId ? <> Save Teacher </> : <> Add Teacher</>}
        </button>

        <button
          className="btn btn-primary returnBtn"
          onClick={() => {
            history.push(`/teachers`);
          }}
        >
          Back to Teachers
        </button>
      </div>
    </form>
  );
};
