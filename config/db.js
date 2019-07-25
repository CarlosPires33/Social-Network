const mongoose = require ('mongoose')
const config = require ('config')
const db = config.get('mongoURI')

const dbConnect = async () => {
    try {
      await mongoose.connect(db, {useCreateIndex:true, useNewUrlParser: true,})
      console.log('Database is connected')  
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
}

module.exports = dbConnect