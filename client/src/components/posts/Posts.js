import React, {Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post' 
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm';

const Posts = ({getPosts, post:{posts,loading}}) => {
    useEffect(()=> {
        getPosts()
    }, [getPosts])

    return (
       <Fragment>
           {loading ? <Spinner/>: <Fragment>
              <h1 className="register-form">Welcome to Posts Page</h1>
              <PostForm />
              {posts.length === 0 ? <h4>No posts found</h4> : posts.map(post => (<PostItem key={post._id} post={post}/>))}
           
           </Fragment>
           
           }
       </Fragment>
    )
}

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps,{getPosts}) (Posts)
