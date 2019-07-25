import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileItem = ({profile:{
    _id,
    user:{name, avatar}, 
    status,
    company,
    skills,
    location}
}) => {
    return (
        <Fragment>
            <img src={avatar} className="round-img" alt="" />
            <div className="my-2">
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
            
                <ul>
              { skills.slice( 0, 4 ).map((skill, index)=>(
                  <li key={index} className="text-primary">
                      <i className="fas fa-check"></i>{skill}
                  </li>
              ))}
            </ul>
            </div>
            
        </Fragment>
    )
}

ProfileItem.propTypes = {

}

export default ProfileItem
