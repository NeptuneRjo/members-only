const express = require('express')
const router = express.Router()

const { createUser, signInUser, signOutUser } = require('../controllers/user')

router
	.route('/sign-up')
	.post(createUser)
	.get((req, res) => res.render('sign-up', { title: 'Sign Up' }))

router
	.route('/sign-in')
	.get((req, res) => res.render('sign-in', { title: 'Sign In' }))

router.route('/sign-out').get(signOutUser)

module.exports = router
