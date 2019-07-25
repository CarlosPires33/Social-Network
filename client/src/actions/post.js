import { 
    GET_POSTS, 
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,GET_POST,
    ADD_COMMENTS,
    REMOVE_COMMENTS
} from './types'
import axios from 'axios'
import {setAlert} from './alert'


export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }   
} 


export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/post/${id}`)
        dispatch({
            type:GET_POST,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

export const addLikes = id => async dispatch => {
    try {
        const res = await axios.put(`/api/post/addlikes/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id, likes:res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

export const removeLikes = id => async dispatch => {
    try {
        const res = await axios.put(`/api/post/unlikes/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id, likes:res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

export const deletePost = id => async dispatch => {
    try {
       await axios.delete(`/api/post/${id}`)
       dispatch({
           type:DELETE_POST,
           payload:id
       })
        
       dispatch(setAlert('Post removed', 'sucess'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

export const addPost = (formData) => async dispatch => {
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const res = await axios.post('/api/post',formData, config)
        
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('Post created!', 'success'))
    
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}
export const addComments = (id, formData) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/post/comments/${id}`, formData, config)
        dispatch({
            type:ADD_COMMENTS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

export const removeComments = (id, commentsID) => async dispatch => {
    try {
        await axios.delete(`/api/post/comments/${id}/${commentsID}`)
        dispatch({
            type:REMOVE_COMMENTS,
            payload:commentsID
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}
