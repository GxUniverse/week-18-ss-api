const User = require('../models/user')
const bcrypt = require("bcrypt")
const userController = require('express').Router()
const verifyToken = require('../middleware/verifyToken')