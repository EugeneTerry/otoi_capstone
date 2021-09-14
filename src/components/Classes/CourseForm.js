import React, {useState, useEffect, useContext} from "react";
import { CourseContext } from "./CourseProvider";
import { useHistory, useParams } from "react-router-dom";
import { TeacherContext} from "../Teachers/TeacherProvider"