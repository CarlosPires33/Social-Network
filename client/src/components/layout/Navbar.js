import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const Navbar = ({logout, auth:{loading, isAuthenticated}}) => {
    
    const registered = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                  <a onClick={logout} href="/" className="nav-link">LOGOUT</a>
            </li>
            <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">DASHBOARD</Link>
            </li>
            <li className="nav-item">
                  <Link to="/profiles" className="nav-link">PROFILES</Link>
            </li>
            <li className="nav-item">
                  <Link to="/posts" className="nav-link">POSTS</Link>
            </li>
        </ul>
    )

    const unregistered = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="/register" className="nav-link">REGISTER</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">LOGIN</Link>
            </li>
        </ul>
    )
    
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark  bg-info fixed-top">
            <div className="container">
                <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse_target">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapse_target">
                    
                    <a href="/" className="navbar-brand">SOCIAL NETWORK</a>
                    
                    <ul className="navbar-nav ml-auto">
                        {loading !== null &&
                            <Fragment>
                                {isAuthenticated ? registered : unregistered}
                            </Fragment>
                        }
                    </ul>
                </div>
                    
            
               
           
            </div>
                    
           
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout}) (Navbar)
