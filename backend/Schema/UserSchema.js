const mongoose=require('mongoose')

exports.userSchema=new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    avatar: {
        type: String,
        required: true
    },

    expireToken: Date,
},
    { timestamps: true }
)

