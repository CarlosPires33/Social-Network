import React, {useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import { withRouter } from 'react-router-dom'

const EditProfile = ({createProfile, history, getCurrentProfile, profile:{loading,profile}}) => {
    
    const [formData, setFormData] = useState({
       company:'',
       status:'',
       bio:'',
       website:'',
       location:'',
       skills: '',
       linkedin: '',
       twitter:'',
       facebook:''
    }) 
    const [displaySocialmedia, toggleDisplaySocialmedia] = useState(false)

    const {company,status, bio, location, website, skills, linkedin, twitter, facebook} = formData

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
    const handleSubmit = e => {
        e.preventDefault()
        createProfile(formData, history, true)
    }

    useEffect(()=>{
        getCurrentProfile()

        setFormData({
            company: loading || !profile.company ? '': profile.company,
            status: loading || !profile.status ? '': profile.status,
            bio:loading || !profile.loading ? '': profile.loading,
            location: loading || !profile.location ? '': profile.location,
            website: loading || !profile.website ? '': profile.website,
            skills: loading || !profile.skills ? '': profile.skills,
            linkedin: loading || !profile.linkedin ? '': profile.linkedin,
            twitter: loading || !profile.twitter ? '': profile.twitter,
            facebook:loading || !profile.facebook ? '': profile.facebook
        })
    },[getCurrentProfile,loading])


    return (
        <Fragment>

        <h1 className="register-form">Edit Your Profile</h1>
        <form onSubmit={e => handleSubmit(e)}>
             <div className="form-group">
                <label>Company</label>
                <input className="form-control"
                    type="text"
                    name="company"
                    value={company}
                    onChange={e => handleChange(e)}
            />
            </div>
            <div className="form-group">
                <label>Status</label>
                <input className="form-control"
                    type="text"
                    name="status"
                    value={status}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="form-group">
                <label>Bio</label>
                <input className="form-control"
                type="text"
                name="bio"
                value={bio}
                onChange={e => handleChange(e)}
            />
            </div>

            <div className="form-group">
                <label>Location</label>
                <input className="form-control"
                    type="text"
                    name="location"
                    value={location}
                    onChange={e => handleChange(e)}
                />
            </div>

            <div className="form-group">
                <label>Website</label>
                <input className="form-control"
                    type="text"
                    name="website"
                    value={website}
                    onChange={e => handleChange(e)}
                />
            </div>

            <div className="form-group">
                <label>Skills</label>
                <input className="form-control"
                    type="text"
                    name="skills"
                    value={skills}
                    onChange={e => handleChange(e)}
                />
            </div>

            
            <div className="my-3">
                <button className="btn btn-info" onClick={() => toggleDisplaySocialmedia(!displaySocialmedia)}>Click here </button>
            </div>

            {displaySocialmedia && (<Fragment>

                <div className="form-group">
                <label>Linkedin</label>
                <input className="form-control"
                    type="text"
                    name="linkedin"
                    value={linkedin}
                    onChange={e => handleChange(e)}
                />
                </div>

                <div className="form-group">
            <label>Twitter</label>
            <input className="form-control"
                type="text"
                name="twitter"
                value={twitter}
                onChange={e => handleChange(e)}
            />
            </div>
            <div className="form-group">
            <label>Facebook</label>
            <input className="form-control"
                type="text"
                name="facebook"
                value={facebook}
                onChange={e => handleChange(e)}
            />
            </div>
             
            
            </Fragment>)}
        
            <button className="btn btn-info">EDIT PROFILE</button>
        </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps,{createProfile,getCurrentProfile}) (withRouter(EditProfile))
