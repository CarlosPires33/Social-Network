import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComments } from '../../actions/post'

const CommentForm = ({addComments, id}) => {
    
    const [textData, setTextData] = useState('')
    const {text} = textData

    const handleChange = e => setTextData ({...textData,[e.target.name]:e.target.value })
    
    const handleSubmit = e => {
        e.preventDefault()
        addComments(id, {text})
    }
    return (
        <Fragment>
            <h1 className="register-form" >Add a Comment</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <textarea
                    cols="100"
                    rows="5"
                    name="text"
                    value={text}
                    onChange={e=> handleChange(e)}
                >
                </textarea>

                <button className="btn btn-info my-4">Add Comment</button>
            </form>
        </Fragment>
        
    )
}

CommentForm.propTypes = {
    addComments: PropTypes.func.isRequired
}

export default connect(null, {addComments}) (CommentForm)