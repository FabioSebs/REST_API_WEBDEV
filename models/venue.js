import mongoose from 'mongoose'

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

//THIS SHOWS WHAT WILL BE EXPORTED FROM THIS MODULE
export const Venue = mongoose.model('Venue', venueSchema)