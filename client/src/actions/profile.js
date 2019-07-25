import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE,DELETE_ACCOUNT,CLEAR_PROFILE, GET_PROFILES} from './types'
import axios from 'axios'
import { setAlert } from './alert'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
    
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })  
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        }) 
    }
} 

export const getProfiles = () => async dispatch => {
    
    dispatch({ type: CLEAR_PROFILE });
    
    try {
      const res = await axios.get('/api/profile')
      
      dispatch({
          type:GET_PROFILES,
          payload:res.data
      })
      
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status }
        })
    }
}

export const getProfileById = id => async dispatch => {
    try {
      const res = await axios.get(`/api/profile/${id}`);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Create or update profile
export const createProfile = (
    formData,
    history,
    edit = false
  ) => async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const res = await axios.post('/api/profile', formData, config);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
  
      history.push('/dashboard');
      

    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  





export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        
        const res = await axios.put('/api/profile/experience', formData, config)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        history.push('/dashboard')
        dispatch(setAlert( 'Experience added', 'success'))

    } catch (err) {
        const errors = err.response.data.errors 
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }   

         dispatch({
            type: PROFILE_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        }) 

        dispatch(setAlert('Education added', 'success'))
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText, status:err.response.status}
        })
    }
}

export const removeExp = id => async dispatch => {
    try {
        const res = axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        }) 
        dispatch(setAlert('Experience removed', 'success'))

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })     
    }
}

export const removeEdu = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert('Education removed', 'success'))

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })      
    }
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure?')) {
        try {
           await axios.delete('/api/profile') 
           dispatch({type:CLEAR_PROFILE})
           dispatch({type:DELETE_ACCOUNT})
           
           dispatch(setAlert('Account has been permanently deleted', 'success'))

        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText, status:err.response.status}
            })
        }
    }
}