const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/Category')

const sampleCategories = [
  { name: 'Politics', slug: 'politics', description: 'Coverage of elections and governance.' },
  { name: 'Business', slug: 'business', description: 'Economic news and market updates.' },
  { name: 'Technology', slug: 'technology', description: 'Innovation and startup coverage.' },
  { name: 'Sports', slug: 'sports', description: 'Match reports and athlete stories.' },
]

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: sampleCategories })
    }

    const categories = await Category.find()
    res.json({ success: true, data: categories })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router
