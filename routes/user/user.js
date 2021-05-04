import express from 'express'
const router = express.Router() //Express Router Module
import {User} from '../../models/user.js'


/**
 * @swagger
 * /:
 *  get:
 *    description: Get all Users
 *    responses:
 *      200:
 *        description: Success 
 */

//GETTING ALL PHOTOS
router.get('/', async (req,res)=> {
    try{
        const user = await User.find()
        res.json(user) 
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

//GETTING ONE SUBSCRIBER
router.get('/:id', getUser, (req,res) =>{
    res.send(res.user)
})

//CREATING SUBSCRIBER
router.post('/', async (req,res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    try{
        const newUser = await user.save()       //SAVE TO DATABASE AND STORE CONTENT IN VARIABLE
        res.status(201).json(newUser)            //CODE FOR CREATION SUCCESSFUL AND DISHES A RESPONSE WITH JSON OBJECT
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

//UPDATING A SUBSCRIBER
router.patch('/:id' , getUser, async (req,res)=>{
    //CONDITIONALS TO CHECK THE REQUEST
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    //SAVING TO DATABASE AND DISHING A RESPONSE WITH THE UPDATED SUBSCRIBER
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

//DELETING A SUBSCRIBER
router.delete('/:id', getUser, async (req,res)=>{
    try{
        await res.photo.remove()
        res.json({message: 'Deleted Photo'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//MIDDLEWARE
async function getUser(req, res, next) {
    let user
    
    try{
        user = await User.findById(req.params.id)
        if (user == null){
            return res.status(404).json({message: 'Cannot find photo'})
        }
    }
    catch (err){
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}
export const userRouter = router

