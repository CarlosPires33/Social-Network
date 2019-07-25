import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import {addLikes, removeLikes,deletePost} from '../../actions/post'


const PostItem = ({
    addLikes,
    removeLikes,
    deletePost,
    auth,
    post: {_id, user, name, avatar, text, comments, likes, date },
    showActions
    
}) => {
    return (
        <Fragment>
            <h1 className="register-form">Post</h1>
            <div className="my-2">
                <img src={avatar} alt="" className="round-img" />
                <h1 className="register-form"> {name} </h1>
                <Link to={`/posts/${_id}`}>More Info</Link>
                <p>{text} - posted on <Moment format="YYYY/MM/DD">{date}</Moment></p>
            </div>

            {showActions && 
            
            <Fragment>
                <div className="my-2">
                <button onClick={e => addLikes(_id)}
                className="btn btn-primary"><i className="fas fa-thumbs-up"></i>{' '}
                { likes.length > 0  && <span>{likes.length}</span> }</button>
                {' '}
                <button onClick={e => removeLikes(_id)}
                className="btn btn-warning"><i className="fas fa-thumbs-down"></i>{' '}
                </button>
                {' '}
                <Link 
                    to={`/post/${_id}`}
                    className="btn btn-info"> 
                    <i className="fas fa-comments"></i> {' '}
                    {comments.length > 0 && <span>{comments.length}</span>} </Link>
                {' '}

                {auth.loading === false && auth.isAuthenticated && auth.user._id === user._id &&  (
                <button
                   onClick={() => deletePost(_id)}
                   type='button'
                   className='btn btn-danger'
                  >
                  <i className='fas fa-times' />
                </button>
                )}
            </div>

            </Fragment>}
          
        </Fragment>
    )
}

PostItem.defaultProps = {
    showActions:true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLikes:PropTypes.func.isRequired,
    removeLikes:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addLikes,removeLikes,deletePost}) (PostItem)
