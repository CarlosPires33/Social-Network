import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import {removeExp} from '../../actions/profile'


const Experience = ({experience, removeExp}) => {
  const experiences = experience.map(exp => 
    <tr key={exp._id}>
       <td>{exp.company}</td>
       <td>{exp.location}</td>
       <td>{exp.title}</td>
       <td>
            <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - 
            {exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
       </td>
       <td>
           <button onClick={e => removeExp(exp._id)} className="btn btn-danger">DELETE EXPERIENCE</button>
        </td>
    </tr>
    )
    
    return (
        <Fragment>
            <h2>Experience Credentials</h2>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                 {experiences}
                </tbody>
                
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    removeExp: PropTypes.func.isRequired
}

export default connect(null,{removeExp}) (Experience)
