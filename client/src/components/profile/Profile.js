import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'

const Profile = ({getProfileById, profile:{profile,loading}, auth, match}) => {
    
    useEffect(()=>{
        getProfileById(match.params.id)
    },[getProfileById, match.params.id])
    
    return (
        <Fragment>
            { profile === null || loading ? <Spinner/>: 
            
            <Fragment>
                <Link className="btn btn-primary register-form" to="/profiles">Back to Profiles</Link>
                {auth.loading === false && auth.isAuthenticated && auth.user._id === profile.user._id && 
                (<Fragment>
                    <Link className="btn btn-info" to="/edit-profile">Edit profile</Link>
                </Fragment>)}   
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>
                
                {profile.experience.length > 0 ? profile.experience.map( experience => (
                    <ProfileExperience key={experience._id} experience={experience} />
                )) : <h4>No experience credentials</h4>}

                {profile.education.length > 0 ? profile.education.map( education => (
                    <ProfileEducation key={education._id} education={education}/>
                )) : <h4>No Education credentials</h4> }        
                
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfileById}) (Profile)
