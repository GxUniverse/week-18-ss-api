const verifyToken = require('../middleware/verifyToken')
const Thought = require('../models/thought')
const thoughtController = require('express').Router()

//get all thoughts
thoughtController.get('/getAll', async(req, res) => {
        try {
            const thoughts = await Thought.find({})
            return res.status(200).json(thoughts)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    })


//get one thought
thoughtController.get('/find/:id', async(req, res) => {
    try {
        const thought = await Thought.findById(req.params.id)
        if(!thought){
            return res.status(500).json({msg: "No such thought with this id!"})
        } else {
            return res.status(200).json(thought)
        } 
    } catch (error) {
        
    }
})
//create a thought

thoughtController.post('/', verifyToken, async(req, res) => {
    try {
        const thought = await Thought.findById(req.params.id)
        if(thought.userId === req.user.id){
            const updatedThought = await Thought.findByIdAndUpdate(req.params.id, {set: req.body}, {new: true})
            return res.status(200).json(updatedThought)
        } else {
            return res.status(403).json({msg: "You can update only your own thought"})
        }
    } catch (error) {
        
    }
})
//delete a thought
thoughtController.delete('/:id', verifyToken, async(req,res) => {
    try {
        const thought = await Thought.findById(req.params.id)

        if(!thought){
            return res.status(500).json({msg:"No such thought"})
        } else if(thought.userId !== req.user.id){
            return res.status(403).json({msg: "Thought is succesfully deleted"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

//adding likes & dislikes

thoughtController.put('/likeDislike/:id', verifyToken, async(req,res) => {
    try {
        const currentUserId = req.user.id
        const thought = await Thought.findById(req.params.id)

        // if the user has already liked the thought, remove it.
        // Otherwise, add him into the likes array

        if(thought.likes.includes(currentUserId)){
            thought.likes = thought.likes.filter((iod) => id!== currentUserId)
            await thought.save()
            return res.status(200).json({msg:"Succesfully unliked the thought"})
        } else {
            thought.likes.push(currentUserId)
            return res.status(200).json({msg: "Liked this idiots thought"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = thoughtController


//edit a thought