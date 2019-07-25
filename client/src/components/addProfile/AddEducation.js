import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'
import {withRouter} from 'react-router-dom'

const AddEducation = ({addEducation, history}) => {
    
const [formData, setFormData] = useState({
    school: '', 
    degree:'',
    fieldOfStudy:'',
    to:'',
    from:'',
    current:'',
    description:''
})

const [toDateDisable, toggleToDateDisable] = useState(false)

const {school, degree, from, to, current, fieldOfStudy, description} = formData

const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})

const handleSubmit = e => {
    e.preventDefault()
    addEducation(formData, history)
}
    
    return (
        <Fragment>
        <h1 className="register-form">Add Education</h1>
        <form onSubmit={e=>handleSubmit(e)}>
          <div className="form-group">
            <label>School:</label>
            <input className="form-control"
            type="text"
            name="school"
            value={school}
            onChange={e => handleChange(e)}
          />
          </div>
           <div className="form-group">
            <label>Description:</label>
            <input className="form-control"
            type="text"
            name="description"
            value={description}
            onChange={e => handleChange(e)}
          />
           </div>
          <div className="form-group">
            <label>Degree:</label>
            <input className="form-control"
            type="text"
            name="degree"
            value={degree}
            onChange={e => handleChange(e)}
          />
           </div>
          <div className="form-group">
            <label>Field Of Study:</label>
            <input className="form-control"
            type="text"
            name="fieldOfStudy"
            value={fieldOfStudy}
            onChange={e => handleChange(e)}
          />
           </div>
          <div className="form-group">
            <label>From:</label>
            <input className="form-control"
            type="date"
            name="from"
            value={from}
            onChange={e => handleChange(e)}
            required
          />
           </div>
          <div className="form-group">
           <label>To:</label>
           <input className="form-control"
            type="date"
            name="to"
            value={to}
            onChange={e => handleChange(e)}
            disabled={toDateDisable ? 'disable':''}
            
          />
           </div>
          <div className="form-group">
            <label>Current:</label>
            <input className="form-control"
            type="checkbox"
            name="current"
            value={current}
            checked={current}
            onChange={e => 
            {
              setFormData({...formData, current:!current});
              toggleToDateDisable(!toDateDisable)
            }} />
           </div>
 
          
          <button className="btn btn-info"> Add Experience</button>
        </form>

        </Fragment>      
    )
}

AddEducation.propTypes = {
    addExperience:PropTypes.func.isRequired
}

export default connect(null,{addEducation}) (withRouter(AddEducation))
