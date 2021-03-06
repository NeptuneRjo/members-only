const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'must provide a username'],
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'must enter a password'],
	},
})

module.exports = mongoose.model('User', UserSchema)
