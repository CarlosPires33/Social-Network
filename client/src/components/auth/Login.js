import React, {Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { Redirect, Link } from 'react-router-dom'

const Login = ({ login,isAuthenticated }) => {
    const [formData, setFormData] = useState({
       email:'',
       password:''
    })
    const {email, password} = formData
    
    const handleChange = e => setFormData({...formData,[e.target.name]: e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        login({email, password})
    }
    
    if(isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }


    return (
        <Fragment>
            <h1 className="register-form">LOGIN</h1>
            <form onSubmit={e => handleSubmit(e)}>
            <div className="form-group">
                <label>Email</label>
                <input className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="myemail@email.com"
                    onChange={e=> handleChange(e)}/> 
            </div>
            
            <div className="form-group">
            <label>Password</label>
                <input className="form-control"
                    type="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={e=> handleChange(e)}/>
            </div>
            <button type="submit" className="btn btn-info" value="LOGIN"> LOGIN </button> <br/>
            <Link className="text-info" to="/register"><em>Click here if you still are unregistered</em></Link>
        </form>
        </Fragment>
    )
          
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{ login }) (Login)
