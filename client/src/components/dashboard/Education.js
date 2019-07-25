import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { removeEdu } from '../../actions/profile'
import Moment from 'react-moment'

const Education = ({education, removeEdu}) => {
    
    const educations = education.map(edu =>
     <tr key={edu._id}>
           <td>{edu.school}</td>
           <td>{edu.degree}</td>
           <td>{edu.fieldOfStudy}</td>
           <td>
               <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {
                   edu.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>
               }
                    
           </td>
           <td>
               <button onClick={e => removeEdu(edu._id)} className="btn btn-danger">DELETE EDUCATION</button>
           </td>
     </tr>
    )
    
    return (
        <Fragment>
            <h2>Education Credentials</h2>
            <table>
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Field of Study</th>
                        <th>Years</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            
                 <tbody>
                     {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    removeEdu:PropTypes.func.isRequired
}

export default connect(null, {removeEdu})(Education)
