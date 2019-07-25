import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile:{skills, bio, user:{name}}}) => {
    return (
        <Fragment>
            <div className="my-2">
                {bio && 
                <Fragment>
                    <h2>{name.trim( ).split(' ')[0]}´s bio </h2>
                    <p className="my-1">{bio}</p>
                </Fragment>}
                <ul>
                  {skills.map((skill, index)=> (
                  <li key={index}>
                      <i className="fas fa-check"></i>{skill}
                  </li>))}
                </ul>
                
                
            </div>
        </Fragment>
    )
}

ProfileAbout.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileAbout
