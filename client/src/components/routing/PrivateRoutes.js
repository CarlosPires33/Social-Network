import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoutes = ({component:Component, auth:{loading, isAuthenticated},...rest}) => 
<Route {...rest} render= {props => !loading && !isAuthenticated ? <Redirect to="/login"/> : <Component {...props}/>} />


PrivateRoutes.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth
})


export default connect(mapStateToProps)(PrivateRoutes)
