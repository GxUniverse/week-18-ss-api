const mongoose = require("mongoose")

const ReactionSchema = new mongoose.Schema({
    thoughtId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    reactionText: {
        type: String,
        required: true,
        min: 4,
    },
    likes: {
        type: [String],
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model("Reaction", ReactionSchema)