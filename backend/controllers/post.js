const verifyToken = require('../middleware/verifyToken')
const post = require('../models/post')
const Post = require('../models/post')
const postController = require('express').Router()

//get all posts
postController.get('/getAll', async(req, res) => {
        try {
            const posts = await Post.find({})
            return res.status(200).json(posts)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    })


//get one post
postController.get('/find/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(500).json({msg: "No such post with this id!"})
        } else {
            return res.status(200).json(post)
        } 
    } catch (error) {
        
    }
})
//create a post

postController.post('/:id', verifyToken, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.user.id){
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {set: req.body}, {new: true})
            return res.status(200).json(updatedPost)
        } else {
            return res.status(403).json({msg: "You can update only your own post"})
        }
    } catch (error) {
        
    }
})
//delete a post
postController.delete('/:id', verifyToken, async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(500).json({msg:"No such post"})
        } else if(post.userId !== req.user.id){
            return res.status(403).json({msg: "Post is succesfully deleted"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

//adding likes & dislikes

postController.put('/likeDislike/:id', verifyToken, async(req,res) => {
    try {
        const currentUserId = req.user.id
        const post = await Post.findById(req.params.id)

        // if the user has already liked the post, remove it.
        // Otherwise, add him into the likes array

        if(post.likes.includes(currentUserId)){
            post.likes = post.likes.filter((iod) => id!== currentUserId)
            await post.save()
            return res.status(200).json({msg:"Succesfully unliked the post"})
        } else {
            post.likes.push(currentUserId)
            return res.status(200).json({msg: "Liked this idiots post"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = postController


//edit a post