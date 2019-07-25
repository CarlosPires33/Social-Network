const express = require ('express')
const router = express.Router()
const auth = require ('../../middleware/auth')
const User = require ('../../models/User')
const {check,validationResult} = require ('express-validator')
const bcrypt = require ('bcryptjs')
const config = require ('config')
const jwt = require ('jsonwebtoken')

//@ GET: /api/auth
//@ description: get user 
//@ access: private

router.get('/', auth, async(req,res)=>{
    
    try {
        const user = await User.findById(req.user.id).select('-password')
        if(!user) {
            return res.status(404).json({msg:'User not found'})
        }
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@ POST: /api/auth
//@ description: get user 
//@ access: private
router.post('/', 
    [
        check('email', 'please include a valid email').isEmail(),
        check('password','password is required').exists()
    ]
, async(req,res)=> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    const {email, password} = req.body
    
    try {
      let user = await User.findOne({email})
      if(!user) {
          return res.status(400).json({errors:[{msg:'Invalid Credentials'}]})
   
      }
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch) {
          return res.status(400).json({errors:[{msg:'Invalid Credentials'}]})
      }

      const payload = {
          user:{
              id:user.id
          }
      }
      jwt.sign(payload,config.get('jwtSecret'), { expiresIn:36000 }, (err,token)=>{
          if(err) throw err 
          res.json({token})
        
      })
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router