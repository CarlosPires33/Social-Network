import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'


const Dashboard = ({ getCurrentProfile,auth:{user, isAuthenticated}, profile:{loading, profile},deleteAccount}) => {
    
    useEffect(()=> {
        getCurrentProfile()
    },[getCurrentProfile])
    
    return (
        <Fragment>
            {loading ? <Spinner/> : <Fragment>
                <h1 className="register-form"> Welcome to {user && user.name }'s page </h1>
                {profile !== null ? 
                (<Fragment>
                    <DashboardActions /> 
                     <Experience experience={profile.experience} />
                     <Education education={profile.education} />
                     <div className="my-2">                       
                        <button onClick={()=> deleteAccount()} className="btn btn-danger">DELETE ACCOUNT</button> 
                     </div>
                           

                    
                </Fragment>)
                
                : <p>You don´t have profile. Click here to create a profile <Link to="/create-profile">CREATE PROFILE </Link></p>}
            </Fragment>}
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount}) (Dashboard)
