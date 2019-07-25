import React from 'react'
import {Link} from 'react-router-dom'

const DashboardActions = () => {
    return (
        <div>
            <Link to="/edit-profile" className="btn btn-info">EDIT PROFILE</Link>
            <Link to="/add-experience" className="btn btn-info" >ADD EXPERIENCE</Link>
            <Link to="/add-education" className="btn btn-info" >ADD EDUCATION</Link>
        </div>
    )
}

export default DashboardActions
