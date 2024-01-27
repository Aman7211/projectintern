import React from 'react'
import Signup from './Signup'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=' bg-primary text-white pt-1' style={{ marginBottom:"10px", display:"flex"}}>
    <h4 style={{ marginLeft:"150px",padding:"15px", textDecoration:"underline"}}>
    Project Developed For Internship purpose
    </h4>
    <div style={{ marginLeft:"250px", padding:"15px"}}>
    <Link to="/signup">
    <button type="button" className="btn btn-danger btn-center">Sign In</button>
    </Link>
        </div>
    </div>
  )
}

export default Header