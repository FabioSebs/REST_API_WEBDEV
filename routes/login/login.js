//Get env variables
import dotenv from 'dotenv';
dotenv.config()

import express from 'express'
import jwt from 'jsonwebtoken'
const router = express.Router() //Express Router Module

router.get('/', authenticateToken, (req,res)=>{
    res.json([{token:"verified"}])
})

router.post('/', (req,res)=>{
    //Authenticating User
    const username = req.body.usernmame
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken})
})



function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export const loginRouter = router
