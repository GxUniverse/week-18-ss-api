const mongoose = require("mongoose")

const ThoughtSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4,
    },
    desc: {
        type: String,
        required: true,
        min: 8,
    },
    likes: {
        type: [String],
        default: [],
    },
    userId: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Thought", ThoughtSchema)