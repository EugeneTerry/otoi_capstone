import React from "react"
import { Link, useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from "styled-components"

const NavLinks=styled.nav`

.nav-link{
  color:#009A9C;
  font-weight:bold;
  padding-top: 17px;
}


button{
  background-color: #40434A !important;
}
`

export const NavBar =() =>{
  const history = useHistory()
  const LogOut = () => {
    sessionStorage.removeItem("otoi_user")
    history.push("/login")
  }
  
  return(
    <NavLinks className="navbar navbar-expand-md navbar-light bg-light">
      <div className="nav-link-logo">
          <img src="../OTOI_navicon02.png" alt="OTOI icon" id="logo"/>
        </div>
     <ul className="nav nav-pills nav-fill">
       <li className="nav_item"><Link className="nav-link" to="/schools">Schools</Link></li>
       <li className="nav_item"><Link className="nav-link" to="/teachers">Teachers</Link></li>
       <li className="navbar_item"><Link className="nav-link" to="/courses">Courses</Link></li>
       <li className="nav_item"><Link className="nav-link" to="/">Assignments</Link></li>
       <li className="navbar_item"><Link className="nav-link" to="/past">Past Due Assignments</Link></li>
       {/* Later on I will be making this only show up on the navBar if the there are past due assignments */}
       <li className="navbar_item"><button  onClick={LogOut}>Logout</button></li>
     </ul>
    </NavLinks>
  )
}