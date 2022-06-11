const Post = require('../models/Post')

const renderNotFound = (res) => {
	res.status(404).render('not-found', { title: 'Post not found' })
}

const getAllPosts = async (req, res) => {
	Post.find()
		.then((result) =>
			res.render('index', {
				title: 'All Posts',
				data: { posts: result, amount: result.length },
			})
		)
		.catch((err) => console.log(err))
}

const createPost = async (req, res) => {
	const post = await Post.create(req.body)
	res.status(201).json({ redirect: '/' })
}

const getPost = async (req, res, next) => {
	const { id: postID } = req.params

	Post.findById(postID)
		.then((result) =>
			res.status(200).render('post-details', { post: result, title: 'Post' })
		)
		.catch(() => {
			renderNotFound(res)
		})
}

const deletePost = async (req, res) => {
	const { id: postID } = req.params

	Post.findByIdAndDelete(postID)
		.then((result) => res.status(200).json({ redirect: '/' }))
		.catch(() => {
			renderNotFound(res)
		})
}

module.exports = {
	getAllPosts,
	createPost,
	getPost,
	deletePost,
}
