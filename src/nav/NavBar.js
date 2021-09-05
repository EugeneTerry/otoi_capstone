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
    <nav className="navbar navbar-light bg-light">
     <ul className="navbar">
       <li className="navbar_item"><Link className="navbar-link" to="/">Assignments</Link></li>
       <li className="navbar_item"><Link className="navbar-link" to="/classes">Classes</Link></li>
       <li className="navbar_item"><Link className="navbar-link" to="/past">Past Due Assignments</Link></li>
       <li className="navbar_item"><button className="nav-link" onClick={LogOut}>Logout</button></li>
     </ul>
    </nav>
  )
}