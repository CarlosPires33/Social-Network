import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileTop = ({profile: {company, website, status, location, social, user:{name,avatar}}}) => {
    return (
        <Fragment>
            <div className="my-2">
                <img src={avatar} className="round-img" alt="" />
                <h2> { name.trim( ).split(' ')[0] }´s Profile</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <div className='icons my-1'>
                    {website && <a href={website}><i className='fas fa-globe fa-2x' /></a>}
                    
                    {social && social.linkedin && <Fragment>
                    <a href={social.linkedin}><i className='fab fa-linkedin fa-2x' /> </a></Fragment>}
                    
                    {social && social.twitter && <Fragment>
                    <a href={social.twitter} ><i className='fab fa-twitter fa-2x' /></a></Fragment>}
                    
                    {social && social.facebook && <Fragment>
                    <a href={social.facebook} ><i className='fab fa-facebook fa-2x' /></a></Fragment>}
                </div>
            </div>
          
        </Fragment>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
