import express from 'express'
const router = express.Router() //Express Router Module
import {Photo} from '../../models/photo.js'

//GETTING ALL PHOTOS
router.get('/', async (req,res)=> {
    try{
        const photo = await Photo.find()
        res.json(photo) 
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

//GETTING ONE SUBSCRIBER
router.get('/:id', getPhoto, (req,res) =>{
    res.send(res.photo)
})

//CREATING SUBSCRIBER
router.post('/', async (req,res)=>{
    const photo = new Photo({
        venue: req.body.venue,
        author: req.body.author
    })

    try{
        const newPhoto = await photo.save()       //SAVE TO DATABASE AND STORE CONTENT IN VARIABLE
        res.status(201).json(newPhoto)            //CODE FOR CREATION SUCCESSFUL AND DISHES A RESPONSE WITH JSON OBJECT
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

//UPDATING A SUBSCRIBER
router.patch('/:id' , getPhoto, async (req,res)=>{
    //CONDITIONALS TO CHECK THE REQUEST
    if (req.body.venue != null) {
        res.photo.venue = req.body.venue
    }
    if (req.body.author != null) {
        res.photo.author = req.body.author
    }
    //SAVING TO DATABASE AND DISHING A RESPONSE WITH THE UPDATED SUBSCRIBER
    try {
        const updatedPhoto = await res.photo.save()
        res.json(updatedPhoto)
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

//DELETING A SUBSCRIBER
router.delete('/:id', getPhoto, async (req,res)=>{
    try{
        await res.photo.remove()
        res.json({message: 'Deleted Photo'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//MIDDLEWARE
async function getPhoto(req, res, next) {
    let photo
    
    try{
        photo = await Photo.findById(req.params.id)
        if (photo == null){
            return res.status(404).json({message: 'Cannot find photo'})
        }
    }
    catch (err){
        return res.status(500).json({message: err.message})
    }

    res.photo = photo
    next()
}

export const photoRouter = router

