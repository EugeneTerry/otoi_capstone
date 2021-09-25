import React from "react"
import {Route, Redirect} from "react-router-dom"
import {NavBar} from "./nav/NavBar"
import { ApplicationViews } from "./components/ApplicationViews"
import {Login} from "./components/auth/Login"
import {Register} from "./components/auth/Register"
import { Wrapper } from "./components/Styles/Globals"

export const OTOI = () => (
  <Wrapper>
    <Route
      render={() => {
        if (sessionStorage.getItem("otoi_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </Wrapper>
)