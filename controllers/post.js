const Post = require('../models/Post')

const renderNotFound = (res) => {
	res.status(404).render('not-found', { title: 'Post not found' })
}

const getAllPosts = async (req, res) => {
	Post.find()
		.then((result) =>
			res.render('index', {
				title: 'All Posts',
				data: { posts: result, amount: result.length, user: req.user },
			})
		)
		.catch((err) => console.log(err))
}

const getCreatePost = (req, res) => {
	res.render('create-post', { title: 'Create a new post' })
}

const createPost = async (req, res) => {
	const post = await Post.create({
		title: req.body.title,
		body: req.body.body,
		author: req.user.username,
		authorID: req.user.id,
	})
	res.status(201).redirect('/')
}

const getPost = async (req, res, next) => {
	const { id: postID } = req.params

	Post.findById(postID).then((result) => {
		if (!result) {
			renderNotFound(res)
		}

		res.status(200).render('post-details', {
			post: result,
			title: 'Post Details',
			user: req.user,
		})
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
	getCreatePost,
	createPost,
	getPost,
	deletePost,
}
