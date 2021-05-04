import express from 'express'
const router = express.Router() //Express Router Module
import {Venue} from '../../models/venue.js'

//GETTING ALL PHOTOS
router.get('/', async (req,res)=> {
    try{
        const venue = await Venue.find()
        res.json(venue) 
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

//GETTING ONE SUBSCRIBER
router.get('/:id', getVenue, (req,res) =>{
    res.send(res.venue)
})

//CREATING SUBSCRIBER
router.post('/', async (req,res)=>{
    const venue = new Venue({
        name: req.body.name,
        address: req.body.address
    })

    try{
        const newVenue = await venue.save()       //SAVE TO DATABASE AND STORE CONTENT IN VARIABLE
        res.status(201).json(newVenue)            //CODE FOR CREATION SUCCESSFUL AND DISHES A RESPONSE WITH JSON OBJECT
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

//UPDATING A SUBSCRIBER
router.patch('/:id' , getVenue, async (req,res)=>{
    //CONDITIONALS TO CHECK THE REQUEST
    if (req.body.name != null) {
        res.venue.name = req.body.name
    }
    if (req.body.address != null) {
        res.venue.address = req.body.address
    }
    //SAVING TO DATABASE AND DISHING A RESPONSE WITH THE UPDATED SUBSCRIBER
    try {
        const updatedVenue = await res.venue.save()
        res.json(updatedVenue)
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

//DELETING A SUBSCRIBER
router.delete('/:id', getVenue, async (req,res)=>{
    try{
        await res.photo.remove()
        res.json({message: 'Deleted Photo'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//MIDDLEWARE
async function getVenue(req, res, next) {
    let venue
    
    try{
        venue = await Venue.findById(req.params.id)
        if (venue == null){
            return res.status(404).json({message: 'Cannot find venue'})
        }
    }
    catch (err){
        return res.status(500).json({message: err.message})
    }

    res.venue = venue
    next()
}

export const venueRouter = router

