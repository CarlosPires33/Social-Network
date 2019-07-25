const express = require ('express')
const router = express.Router()
const auth = require ('../../middleware/auth')
const {check,validationResult} = require ('express-validator')
const Profile = require ('../../models/Profile')
const User = require ('../../models/Profile')

// route: POST: /api/profile
// description: create a post/update a profile
// access: private

router.post('/', [auth,
    [
        check ('status', 'status are required!').not().isEmpty(),
        check ('skills', 'skills are required!').not().isEmpty()
    ]
], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors){
        return res.status(400).json({errors:errors.array()})
    }

    const {company, skills, bio, website, status, linkedin, twitter, facebook, location} = req.body
    
    const profileFields = {}
    profileFields.user = req.user.id
    if(company) profileFields.company = company
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}
    if(linkedin) profileFields.social.linkedin = linkedin
    if(facebook) profileFields.social.facebook = facebook
    if (twitter) profileFields.social.twitter = twitter
    
    try {
      let profile = await Profile.findOne({user: req.user.id})
      if(profile) {
         profile = await Profile.findOneAndUpdate({user:req.user.id}, {$set:profileFields}, {new:true})
         return res.json(profile) 
      } 
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
      
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// route: GET: /api/profile
// description: get current profile profiles
// access: private

router.get('/me', auth, async(req,res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','email'])
        if(!profile){
            return res.status(404).json({msg:'profile not found'})
        }
        res.json(profile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// route: GET: /api/profile
// description: get all profiles
// access: public



router.get('/', async(req,res)=> {
    try {
        const profiles = await Profile.find().populate('user',['name', 'avatar']).sort({date:-1})
        if(!profiles){
            return res.status(404).json({msg:'profiles not found'})
        }
        res.json(profiles)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// route: GET: /api/profile/:id
// description: get profile by id
// access: public

router.get('/:id', async(req,res)=>{
    try {
        const profile = await Profile.findById(req.params.id).populate('user', ['name','avatar'])
        if(!profile) {
            return res.status(404).json({msg:'profile not found'})
        } 
        res.json(profile)
    
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// route: DELETE: /api/profile
// description: delete profile 
// access: private

router.delete('/', auth, async (req, res) => {
    try {
    //   // Remove user posts
    //   await Post.deleteMany({ user: req.user.id });
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// route: PUT: /api/profile/experience
// description: update profile by adding experiences
// access: private

router.put('/experience',[auth,
    [
        check('company','required company').not().isEmpty(),
        check('title','requied title').not().isEmpty(),
        check('from','required starting date').not().isEmpty()
    ]], async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    const {company, title, from, to, current, location, description} = req.body

    const addExp = {company, title, from, to, current, location, description}

    try {
        const profile = await Profile.findOne({user: req.user.id})

        profile.experience.unshift(addExp)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})
// route: DELETE: /api/profile/experience
// description: delete experiences by id
// access: private

router.delete('/experience/:id', auth, async(req,res)=>{
    
    try {
        const profile = await Profile.findOne({user:req.user.id})
        const removeItems = profile.experience.map(exp=> exp.id).indexOf(req.params.id)
        
        profile.experience.splice(removeItems,1)
        
        await profile.save()
        res.json(profile)
    
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// route: PUT: /api/profile/education
// description: update profile by adding educations
// access: private

router.put('/education', [auth,
    [
        check('school', 'school is required').not().isEmpty(),
        check('fieldOfStudy', 'field of study is required').not().isEmpty(),
        check('degree', 'degree is required').not().isEmpty(),
        check('from', 'starting date is required').not().isEmpty()
    ]
], async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {school, degree, fieldOfStudy, from, to, current, description} = req.body
    const addEdu = {school, degree, fieldOfStudy, from, to, current, description}

    try {
        const profile = await Profile.findOne({user:req.user.id})

        profile.education.unshift(addEdu)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// route: DELETE: /api/profile/education
// description: delete education by id
// access: private

router.delete('/education/:id', auth, async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})
        const removeEdu = profile.education.map(edu=> edu.id).indexOf(req.params.id)
        profile.education.splice(removeEdu,1)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router