const express = require('express')

const {isLoggedIn} = require('../middleware/isLoggedIn')

const { createPost, updatePost, deletePost, getPosts } = require('../Controllers/postControllers')

const router = express.Router()


router.route('/post/create').post( isLoggedIn, createPost)

router.route('/post/update/:id').put( updatePost)

router.route('/post/delete/:id').delete( deletePost)

router.route('/post/get').get( getPosts)


module.exports= router