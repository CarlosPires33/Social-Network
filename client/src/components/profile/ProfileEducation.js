import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment' 

const ProfileEducation = ({education:{school, degree, fieldOfStudy, from, to, description}}) => {
    return (
        <Fragment>
            <div className="my-2">
                <h3>Studied at {school}</h3>
                <Moment format="YYYY/MM/DD">{from}</Moment> - {!to? 'Now': <Moment format="YYYY/MM/DD">{to}</Moment>}
                <p>{degree} in {fieldOfStudy}</p>
                <p>{description}</p>
            </div>
            
        </Fragment>
    )
}

ProfileEducation.propTypes = {
education:PropTypes.object.isRequired
}

export default ProfileEducation
