const Post = require('../models/Post')

const getAllPosts = async (req, res) => {
	const posts = await Post.find({})

	res
		.status(200)
		.json({ status: 'success', data: { posts, amount: posts.length } })
}

const createPost = async (req, res) => {
	const post = await Post.createA(req.body)
	res.status(201).json({ post })
}

const getPost = async (req, res, next) => {
	const { id: postID } = req.params
	const post = await Post.findOne({ _id: postID })

	if (!post) {
		const error = new Error(`No post found with the id: ${postID}`)
		error.status = 404
		return next(error)
	}

	res.status(200).json({ post })
}

const deletePost = async (req, res) => {
	const { id: postID } = req.params
	const post = await Post.findOneAndDelete({ _id: postID })

	if (!post) {
		const error = new Error(`No post found with the id: ${postID}`)
		error.status = 404
		return next(error)
	}

	res.status(200).json({ post })
}

module.exports = {
	getAllPosts,
	createPost,
	getPost,
	deletePost,
}
