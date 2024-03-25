const verifyToken = require('../middleware/verifyToken')
const Reaction = require('../models/reaction')
const reactionController = require('express').Router()

// get all reactions from thought
reactionController.get("/:thoughtId", async (req, res) => {
    try {
        const reactions = await Reaction.find({ thoughtId: req.params.thoughtId })

        return res.status(200).json(reactions)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get a reaction
reactionController.get('/find/:reactionId', async (req, res) => {
    try {
        const reaction = await Reaction.findById(req.params.reactionId)

        return res.status(200).json(reaction)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
// create a reaction
reactionController.post('/', verifyToken, async (req, res) => {
    try {
        const createdReaction = await Reaction.create({ ...req.body, userId: req.user.id })

        return res.status(201).json(createdReaction)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
// update a reaction
reactionController.put('/:reactionId', verifyToken, async (req, res) => {
    try {
        const reaction = await Reaction.findById(req.params.reactionId)
        if (!reaction) {
            return res.status(500).json({ msg: "No such reaction" })
        }
        if (reaction.userId === req.user.id) {
            reaction.reactionText = req.body.reactionText
            await reaction.save()
            return res.status(200).json({ reaction, msg: "Reaction has been successfully updated" })
        } else {
            return res.status(403).json({ msg: "You can update only your own reactions" })
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
// delete a reaction
reactionController.delete('/:reactionId', verifyToken, async (req, res) => {
    try {
        const reaction = await Reaction.findById(req.params.reactionId)

        if (reaction.userId === req.user.id) {
            await Reaction.findByIdAndDelete(req.params.reactionId)
            return res.status(200).json({ msg: "Reaction has been succesfully deleted" })
        } else {
            return res.status(403).json({ msg: "You can delete only your own reactions" })
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
// like/unlike reaction
reactionController.put("/likeDislike/:reactionId", verifyToken, async (req, res) => {
    try {
        const currentUserId = req.user.id
        const reaction = await Reaction.findById(req.params.reactionId)

        if (!reaction.likes.includes(currentUserId)) {
            reaction.likes.push(currentUserId)
            await reaction.save()
            return res.status(200).json({ msg: "Reaction has been successfully liked!" })
        } else {
            reaction.likes = reaction.likes.filter((id) => id !== currentUserId)
            await reaction.save()
            return res.status(200).json({ msg: "Reaction has been successfully unliked" })
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = reactionController