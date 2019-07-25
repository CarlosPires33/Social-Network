import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

const Post = ({getPost, post:{loading, post}, match}) => {
    
    useEffect(()=>{
        getPost(match.params.id)
    },[getPost, match.params.id])
    
    return  post === null || loading ? <Spinner/> : 
            <Fragment>
                <Link to="/posts" className="btn btn-info register-form">Back to posts</Link>
                <PostItem post={post} showActions={false} />
                <CommentForm id={post._id}/>
                {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} id={post._id} />))}
            </Fragment>
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post:state.post
})

export default connect(mapStateToProps,{getPost}) (Post)
