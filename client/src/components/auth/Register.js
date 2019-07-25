import React, {Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import {Redirect, Link} from 'react-router-dom'

const Register = ({ register, setAlert, isAuthenticated}) => {
    const [formData, setFormData] = useState({
       name:'',
       email:'',
       password:'',
       password2:'' 
    })
    const {name, email, password, password2} = formData
    
    const handleChange = e => setFormData({...formData,[e.target.name]: e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        if(password!== password2){
            setAlert('Password doens´t match', 'danger')
        } else {
            register({name, email, password})
        }
    }
    if(isAuthenticated) {
        return <Redirect to ="/dashboard"/>
    }
    
    return (
        <Fragment>
           <h1 className="register-form">SIGN IN </h1>
           <form onSubmit={e =>handleSubmit(e)}>
             <div ClassName="form-group">
                <label>Name</label>
                <input className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    placeholder="myname"
                    onChange={e=> handleChange(e)}/>
            </div>
            <br/>
            <div ClassName="form-group">
                <label>Email</label>
                <input className="form-control"
                    type="email"
                    name="email"
                    placeholder="myemail@email.com"
                    value={email}
                    onChange={e=> handleChange(e)}/>
           </div>
           <br/>
            <div className="form-group">
            <label>Password</label>
                <input className="form-control"
                    type="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={e=> handleChange(e)}/>
            </div>   
            
            <div className="form-group">
                <label>Confirm Password</label>
                <input className="form-control"
                    type="password"
                    name="password2"
                    value={password2}
                    placeholder="********"
                    onChange={e=> handleChange(e)}/>
            </div>
            <br/>
            <button className="btn btn-info">REGISTER</button> <br/>
            <Link className="text-info" to="/login"><em>Click here if you´re already registered</em></Link>
        </form>
        </Fragment>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{ register, setAlert }) (Register)
