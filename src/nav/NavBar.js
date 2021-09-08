import React from "react"
import { Link, useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

export const NavBar =() =>{
  const history = useHistory()
  const LogOut = () => {
    sessionStorage.removeItem("otoi_user")
    history.push("/login")
  }
  
  return(
    <nav className="navbar bg-green text-white flex-md-nowrap p-0 shadow">
     <ul className="nav nav-pills nav-fill">
       <li className="nav_item"><Link className="nav-link" to="/">Assignments</Link></li>
       <li className="navbar_item"><Link className="nav-link" to="/courses">Courses</Link></li>
       <li className="navbar_item"><Link className="nav-link" to="/past">Past Due Assignments</Link></li>
       <li className="navbar_item"><button className="nav-link" onClick={LogOut}>Logout</button></li>
     </ul>
    </nav>
  )
}