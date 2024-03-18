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

userController.put("/updateUser/:userId", verifyToken, async(req, res) => {
    if (req.params.userId === req.user.id) {
    try {
        if(req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const updatedUser = await User.findbyIdAndUpdate(req.params.userId, {$set: req.body}, {new: true})
        return res.status(500).json(error.message)
    } catch (error) {
        return res.status(500).json(error.message)
    }
} else {
        return res.status(403).json({ msg: "You can only change your own profile"})
    }
})
//delete

userController.delete("/delteUser/:userId", verifyToken, async(req, res) => {
    if(req.params.userId === req.user.id) {
    try {
        await user.findByIdAndDelete(req.params.userId)
    } catch (error) {
        return res.status(500).json(error.message)
    }
} else {
    return res.status(403).json({msg: "You can delete only your own profile"})
}
})

//follow/unfollow

userController.put('/toggleFollow/:otherUserId', verifyToken, async(req, res) => {
    try{
        const currentUserId = req.user.id
        const otherUserId = req.params.otherUserId

        if(currentUserId === otherUserId){
            return res.status(500).json({msg: 'You can follow yourself idiot'})
        }
        const currentUser = await User.findById(currentUserId)
        const otherUser = await User.findById(otherUserId)

        if(!currentUser.followings.includes(otherUserId)){
            currentUser.followings.push(otherUserId)
            otherUser.followers.push(currentUserId)
            await currentUser.save()
            await otherUser.save()
            return res.status(200).json({msg: "You have succefully follow this idiot"})
        } else {
            currentUser.followings = currentUser.followings.filter((id) => id !== otherUsedrId)
            otherUser.followers = otherUser.followers.filter((id) => id !== currentUserId)
            await currentUser.save()
            await otherUser.save()
            return res.status(200).json({msg: "You have succefully unfollow this idiot"})
        }
    } catch(error){
        return res.status(500).json(error.message)
    }
})

module.exports = userController