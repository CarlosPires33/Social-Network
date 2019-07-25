import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

const Profiles = ({getProfiles, profile:{profiles, loading}}) => {
    
    useEffect(()=> {
        getProfiles()
    }, [getProfiles])
    
    return (
        <Fragment>
            {loading ? <Spinner /> : 
            
            <Fragment> 
            {profiles.length > 0 ? (profiles.map(profile => <ProfileItem key={profile._id} 
                profile={profile}  
            />)) 
            : <h1 className="register-form">No profiles found</h1>}</Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})  (Profiles)
