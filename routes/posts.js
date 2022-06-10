const express = require('express')
const router = express.Router()

const {
	getAllPosts,
	createPost,
	getPost,
	deletePost,
} = require('../controllers/post')

router.route('/').get(getAllPosts).delete(deletePost)
router.route('/:id').get(getPost)
router.route('/new-post').post(createPost)

module.exports = router
