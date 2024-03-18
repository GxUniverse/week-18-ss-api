const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    followings: {
        type: [String],
        default: [],
    },
    followers: {
        type: [String],
        default: [],
    }
}, {timestamps: true})

module,exports = mongoose.model("User", UserSchema)