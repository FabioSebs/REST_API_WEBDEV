import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema({
    venue: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

//THIS SHOWS WHAT WILL BE EXPORTED FROM THIS MODULE
export const Photo = mongoose.model('Photo', photoSchema)