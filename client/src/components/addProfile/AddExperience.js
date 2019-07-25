import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'
import {withRouter} from 'react-router-dom'

const AddExperience = ({addExperience, history}) => {
    
const [formData, setFormData] = useState({
    company: '', 
    title:'',
    from:'',
    to:'',
    current:'',
    location: '',
    description:''
})

const [toDateDisable, toggleToDateDisable] = useState(false)

const {company, title, from, to, current, location, description} = formData

const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})

const handleSubmit = e => {
    e.preventDefault()
    addExperience(formData, history)
}
    
    return (
        <Fragment>
        <h1 className="register-form">Add Experience</h1>
        <form onSubmit={e=>handleSubmit(e)}>
          <div className="form-group">
            <label>Company:</label>
            <input className="form-control"
            type="text"
            name="company"
            value={company}
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
            <label>Title:</label>
            <input className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={e => handleChange(e)}
          />
           </div>
          <div className="form-group">
            <label>Location:</label>
            <input className="form-control"
            type="text"
            name="location"
            value={location}
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

AddExperience.propTypes = {
    addExperience:PropTypes.func.isRequired
}

export default connect(null,{addExperience}) (withRouter(AddExperience))
