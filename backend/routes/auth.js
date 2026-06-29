const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/User')
const router = express.Router()

const fallbackUsers = {
  'admin@topafrica.news': {
    _id: 'local-admin',
    name: 'System Admin',
    email: 'admin@topafrica.news',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  'reporter@topafrica.news': {
    _id: 'local-reporter',
    name: 'Reporter One',
    email: 'reporter@topafrica.news',
    password: bcrypt.hashSync('reporter123', 10),
    role: 'reporter',
  },
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' })
  }

  const normalizedEmail = email.toLowerCase()
  let user = fallbackUsers[normalizedEmail] || null

  if (!user && mongoose.connection.readyState === 1) {
    try {
      user = await User.findOne({ email: normalizedEmail })
    } catch (error) {
      console.warn('Database lookup failed, falling back to local auth.', error.message)
    }
  }

  if (!user) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
})

router.post('/register', async (req, res) => {
  const { name, email, password, role = 'writer' } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email and password are required' })
  }

  const normalizedEmail = email.toLowerCase()

  if (mongoose.connection.readyState === 1) {
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'User already exists' })
    }

    const user = await User.create({ name, email: normalizedEmail, password, role })
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
    return res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  }

  const existingFallbackUser = fallbackUsers[normalizedEmail]
  if (existingFallbackUser) {
    return res.status(409).json({ success: false, error: 'User already exists' })
  }

  fallbackUsers[normalizedEmail] = {
    _id: `local-${Date.now()}`,
    name,
    email: normalizedEmail,
    password: await bcrypt.hash(password, 10),
    role,
  }

  const createdUser = fallbackUsers[normalizedEmail]
  const token = jwt.sign({ id: createdUser._id, role: createdUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

  res.status(201).json({ success: true, token, user: { id: createdUser._id, name: createdUser.name, email: createdUser.email, role: createdUser.role } })
})

module.exports = router
