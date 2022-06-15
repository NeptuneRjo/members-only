const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const createUser = async (req, res, next) => {
	bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
		// error catch for hash
		if (err) {
			return next(err)
		}

		const user = new User({
			username: req.body.username,
			password: hashedPassword,
			isAdmin: req.body.isAdmin,
		}).save((err) => {
			// error catch for new user
			if (err) {
				return next(err)
			}

			res.redirect('/')
		})
	})
}

const signInUser = async (req, res) => {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
	})
}

const signOutUser = async (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
		res.redirect('/')
	})
}

module.exports = {
	createUser,
	signInUser,
	signOutUser,
}
