const User = require('../models/user')
const bcrypt = require("bcrypt")
const userController = require('express').Router()
const verifyToken = require('../middleware/verifyToken')

//get one user
userController.get('/find/:userId', async(req, res) => {
    try {
        const user =await User.findById(req.params.userId)
        if(!user){
            return res.status(500).json({msg: 'No such user, wrong id!'})
        }
        
        const {password, ...others} = user._doc

        return res.status(200).json({user: others})
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
//get all users

userController.get('/findAll', async(req, res) => {
    try {
        const user =await User.find()
      
        const formattedUsers = users.map((user) => {
            return {username: user.username, email: user.email, _id: user.createdAt}
        })

        return res.status(200).json({user: formattedUsers})
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
//update
//delete
//follow/unfollow