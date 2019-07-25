const express = require ('express')
const router = express.Router()
const auth = require ('../../middleware/auth')
const Post = require ('../../models/Post')
const Profile = require ('../../models/Profile')
const User = require ('../../models/User')
const {check, validationResult} = require ('express-validator')


// route: POST: /api/post
// description: create a post/update a post
// access: private

router.post('/', [auth, 
 [
     check('text','text is required').not().isEmpty()
 ]
], async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const user = await User.findById(req.user.id)
        
        let post = new Post ({
            user:req.user.id,
            name:user.name,
            avatar:user.avatar,
            text:req.body.text
        })
        
        await post.save()
        res.json(post)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
    
})


// route: GET: /api/post
// description: get all posts
// access: public

router.get('/', async(req,res)=>{
    try {
        const posts = await Post.find().populate('user', ['name', 'avatar']).select('-password').sort({date:-1})
        if(!posts){
            return res.status(404).json({msg:'posts not found'})
        }
        res.status(200).json(posts)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// route: GET: /api/post/:id
// description: get post by id
// access: public

router.get('/:id', async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg:'Post not found'})
        }
        res.json(post)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// route: DELETE: /api/post/:id
// description: delete post by id
// access: private

router.delete('/:id', auth, async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.user.toString()!== req.user.id){
            return res.status(401).json({msg:'Not authorized'})

        } 
        post.remove()
        await post.save()
        res.json({msg:'post removed'})

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// route: PUT: /api/post/addlikes/:id
// description: add likes
// access: private

router.put('/addlikes/:id', auth, async(req,res)=>{
    try {
      const post = await Post.findById(req.params.id)
      if(post.likes.filter(like=>like.user.toString()===req.user.id).length > 0) {
          return res.status(400).json({msg:'You already add a like'})
      } 
      post.likes.unshift({user:req.user.id})
      await post.save()
      res.json(post.likes)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// route: PUT: /api/post/unlikes/:id
// description: remove likes
// access: private
router.put('/unlikes/:id', auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg:'please add a like'})
        }
        const removeLikes = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeLikes,1)
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// route: POST: /api/post/comments
// description: add comments
// access: private

router.post('/comments/:id', [auth, 
    [
        check('text', 'text is required').not().isEmpty()
    ]
], async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        const user = await User.findById(req.user.id)
        const post = await Post.findById(req.params.id)
        
        const newComments = {
            user: req.user.id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar
        }
        post.comments.unshift(newComments)
        await post.save()
        res.json(post)
        

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

router.delete('/comments/:id/:commentsID', auth, async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        
        const myComments = post.comments.find(comment => comment.id === req.params.commentsID)
        
        if(!myComments){
            return res.status(404).json({msg:'comments not found'})
        }
        
        if(myComments.user.toString() !== req.user.id){
            return res.status(401).json({msg:'not authorize'})
        }
        
        const removeComments = post.comments.map(item => item.id).indexOf(req.params.commentsID)
        post.comments.splice(removeComments,1)
        await post.save()
        res.json(post)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

router.get('/comments/:id', async(req,res)=>{
    try {
       const post = await Post.findById(req.params.id)
       const comments = post.comments.find(comment => comment.id === req.params.id)
       res.json(post)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

router.get('/comments/:id/:commentsID', async(req,res)=>{
    try {
       const post = await Post.findById(req.params.id)
       const comments = post.comments.find(comment => comment.id === req.params.commentsID)
       res.json(comments)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router