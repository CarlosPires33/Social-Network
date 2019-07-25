const express = require ('express')
const router = express.Router()
const {check, validationResult} = require ('express-validator')
const User = require ('../../models/User')
const gravatar = require ('gravatar')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const config = require ('config')

//@ POST: /api/user
//@ description: post user 
//@ access: private


router.post('/',[
    check('name', 'please add name').not().isEmpty(),
    check('email', 'please add valid email').isEmail(),
    check('password', 'please add minim of 6 caracters').isLength({min:6})
],async (req,res)=> {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }


    const {name, email, password} = req.body
    try {
      let user = await User.findOne({email})
      if (user) {
         return res.status(400).json({msg: [{msg:'User already exists'}]})
      }  
      
      const avatar = gravatar.url(email,{
          s:'200',
          r:'pg',
          d:'mm'
      })

      user = new User ({
          name,
          email,
          password,
          avatar
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      const payload = {
          user:{
              id:user.id
          }
      }

      jwt.sign(payload,config.get('jwtSecret'), {expiresIn:36000}, (err,token)=>{
          if(err) throw err
          res.json({token})
      })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})



module.exports = router