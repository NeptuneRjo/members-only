const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/User')

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

require('dotenv').config()

// Database
mongoose.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))

// express
const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Passport & Middleware
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

passport.serializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (user.password !== password) {
				bcrypt.compare(password, user.password, (err, res) => {
					if (res) {
						return done(null, user)
					} else {
						return done(null, false, { message: 'Incorrect password' })
					}
				})
			}
		})
	})
)

app.use((req, res, next) => {
	res.locals.currentUser = req.user
	next()
})

// routes
app.use('/dashboard', postRoutes)
app.use('/users', userRoutes)

app.post(
	'/users/sign-in',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
	})
)

app.get('/', (req, res) => res.redirect('/dashboard'))

// app
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`app listening on port ${port}`))
