import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
    const [textData, setTextData] = useState('')

    const {text} = textData

    const handleChange = e => setTextData({...textData, [e.target.name]: e.target.value})
    const handleSubmit = e => {
        e.preventDefault()
        addPost(textData)
    }
    return (
        <Fragment>
             <h1 className="register-form">Create a Post</h1>
            <form onSubmit={ e => handleSubmit(e)}>
                
                <textarea
                    cols="100"
                    rows="5"
                    placeholder="create a post"
                    name="text"
                    value={text}
                    onChange={e => handleChange(e)}
                >
                    
                </textarea>
                <div className="my-1">
                    <button className="btn btn-info">Submit Post</button>
                </div>
            
            </form>
        </Fragment>
       
    )
}

PostForm.propTypes = {
    addPost:PropTypes.func.isRequired
}

export default connect(null, {addPost}) (PostForm)
