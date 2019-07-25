const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema ({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    comments:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'User'
            },
            text:{
                type:String,
                required:true
            },

            name:{
                type:String
            },

            avatar:{
                type:String
            },

            date:{
                type:Date,
                default:Date.now
            }
            
        }
    ]
})

module.exports = mongoose.model('Post', postSchema)