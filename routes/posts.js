const express = require('express')
const router = express.Router()

const {
	getAllPosts,
	createPost,
	getPost,
	deletePost,
} = require('../controllers/post')

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').get(getPost).delete(deletePost)

module.exports = router
