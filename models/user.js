import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//THIS SHOWS WHAT WILL BE EXPORTED FROM THIS MODULE
export const User = mongoose.model('User', userSchema)