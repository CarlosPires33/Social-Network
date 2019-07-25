import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({
    experience:{company, title, from, to, location, description}
}) => {
    return (
        <Fragment>
           <h5>{company}</h5>
           <p><strong>Position</strong> {title}</p>
            <Moment format="YYYY/MM/DD">{from}</Moment> - 
            {!to ? 'Now': <Moment format="YYYY/MM/DD">{to}</Moment>  }
            <h4>{location} </h4>
            <p><em>{description}</em></p>            
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    experience:PropTypes.object.isRequired
}

export default ProfileExperience
