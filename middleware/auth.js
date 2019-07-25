const jwt = require ('jsonwebtoken')
const config = require ('config')

module.exports = function(req,res,next) {
    
    // creating token
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({msg:'No authorization'})
    }
    try {
        //verifying token
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()

    } catch (err) {
        console.log(err.message)
        res.status(401).json({msg:'No authorization'})
    }
    
}
