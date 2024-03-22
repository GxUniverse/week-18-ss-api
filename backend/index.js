const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const postController = require('./controllers/post')
const commentController = require('./controllers/comment')
const app = express();

// connect my db
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Db is connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  app.use('/auth', authController)
  app.use('/user', userController)
  app.use('/post', postController)
  app.use('/comment', commentController)
  
// connect my server

app.listen(process.env.PORT, () => console.log('Server is sconnected succesfully'));