const express = require('express')
const router = express.Router()

const {
	getAllPosts,
	getCreatePost,
	createPost,
	getPost,
	deletePost,
} = require('../controllers/post')

router.route('/').get(getAllPosts)
router.route('/create-post').get(getCreatePost).post(createPost)

router.route('/:id').get(getPost).delete(deletePost)

module.exports = router
