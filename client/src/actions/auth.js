import {REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_SUCCESS,LOGIN_FAIL,LOAD_USER ,AUTH_ERROR, LOGOUT} from './types' 
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'
import {setAlert} from './alert'

export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type:LOAD_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
            
    }
}

export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password})

    try {
        const res = await axios.post('/api/user', body, config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert('Registration Successful', 'success'))

    } catch (err) {
        const errors = err.response.data.errors 
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type:REGISTER_FAIL
        })
        
    }
    
}

export const login = ({email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('/api/auth', body, config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert('Login Successful', 'success'))

    } catch (err) {
        const errors = err.response.data.errors 
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type:LOGIN_FAIL
        })
        
    }
    
}
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    dispatch(setAlert('Logout Successful', 'success'))

}
