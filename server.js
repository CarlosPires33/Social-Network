const express = require ('express')
const app = express ()
const dbConnect = require ('./config/db')
const user = require ('./routes/api/user')
const auth = require ('./routes/api/auth')
const profile = require ('./routes/api/profile')
const post = require ('./routes/api/post')

dbConnect()
app.use(express.json({extended:false}))

app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/post', post)

const port = 5000 || process.env.PORT

app.listen(port , ()=> {
    console.log(`Server is running on port:${port}`)
})