const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'please provide a title'],
		trim: true,
	},
	body: {
		type: String,
		required: true,
	},
	author: {
		type: String,
	},
	dateCreated: {
		Type: String,
	},
})

module.exports = mongoose.model('Post', PostSchema)
