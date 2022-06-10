const Post = require('../models/Post')

const getAllPosts = async (req, res) => {
	const posts = await Post.find({})

	res
		.status(200)
		.json({ status: 'success', data: { posts, amount: posts.length } })
}

const createPost = async (req, res) => {
	const post = await Post.create(req.body)
	res.status(201).json({ post })
}

const getPost = async (req, res, next) => {
	const { id: postID } = req.params

	Post.findById(postID)
		.then((result) => res.status(200).json({ result }))
		.catch((err) => {
			const error = new Error(`No post found with the id: ${postID}`)
			error.status = 404
			return next(error)
		})
}

const deletePost = async (req, res) => {
	const { id: postID } = req.params

	Post.findByIdAndDelete(id)
		.then((result) => res.status(200).json({ result }))
		.catch((err) => {
			const error = new Error(`No post found with the id: ${postID}`)
			error.status = 404
			return next(error)
		})
}

module.exports = {
	getAllPosts,
	createPost,
	getPost,
	deletePost,
}
