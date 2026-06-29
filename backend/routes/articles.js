const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Article = require('../models/Article')
const { authenticate, authorize } = require('../middleware/auth')
const { validateArticle } = require('../middleware/validation')

const sampleArticles = [
  {
    id: '1',
    title: 'A new era of African innovation is reshaping the continent',
    slug: 'african-innovation-reshaping-the-continent',
    excerpt: 'Governments and startups are turning climate and infrastructure investment into long-term growth.',
    content: 'Across the continent, innovation is emerging from a mix of public investment, private capital, and youthful entrepreneurship.',
    category: 'Technology',
    views: 142,
    status: 'published',
    author: 'Admin',
  },
  {
    id: '2',
    title: 'Regional summit highlights new trade opportunities',
    slug: 'regional-summit-highlights-new-trade-opportunities',
    excerpt: 'Leaders are aligning around cross-border investment and logistics growth.',
    content: 'The summit laid out a roadmap for stronger trade corridors and digital commerce across Africa.',
    category: 'Business',
    views: 81,
    status: 'published',
    author: 'Admin',
  },
  {
    id: '3',
    title: 'New renewable energy hub opens in East Africa',
    slug: 'renewable-energy-hub-opens-in-east-africa',
    excerpt: 'A regional facility aims to accelerate solar and wind projects across the region.',
    content: 'The new renewable energy hub will support local manufacturing and help reduce reliance on imported power.',
    category: 'Energy',
    views: 12,
    status: 'pending',
    author: 'Reporter Jane',
  },
]

const getArticlePayload = (req) => {
  const { limit = 10, page = 1, category, status } = req.query
  const filtered = sampleArticles.filter((item) => {
    if (category && item.category.toLowerCase() !== category.toLowerCase()) return false
    if (status && item.status !== status) return false
    return true
  })

  return {
    success: true,
    data: filtered.slice(0, parseInt(limit)),
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filtered.length,
      pages: Math.max(1, Math.ceil(filtered.length / limit)),
    },
  }
}

// GET all articles
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(getArticlePayload(req))
    }

    const { limit = 10, page = 1, category, status } = req.query
    const skip = (page - 1) * limit

    const filter = {}
    if (category) filter.category = category
    if (status) filter.status = status

    const articles = await Article.find(filter)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Article.countDocuments(filter)

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET pending articles
router.get('/pending', authenticate, authorize(['admin']), async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: sampleArticles.filter((article) => article.status === 'pending') })
    }

    const pending = await Article.find({ status: 'pending' })
      .populate('author', 'name')
      .sort({ createdAt: -1 })

    res.json({ success: true, data: pending })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// GET single article by slug
router.get('/:slug', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const article = sampleArticles.find((item) => item.slug === req.params.slug)
      if (!article) {
        return res.status(404).json({ success: false, error: 'Article not found' })
      }
      return res.json({ success: true, data: article })
    }

    const article = await Article.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar')

    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' })
    }

    article.views += 1
    await article.save()

    res.json({ success: true, data: article })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// POST create article (Admin/Editor/Reporter)
router.post('/', authenticate, authorize(['admin', 'editor', 'reporter']), validateArticle, async (req, res) => {
  try {
    const articleData = {
      ...req.body,
      author: req.user.id,
      status: req.user.role === 'reporter' ? 'pending' : 'published',
    }

    const article = await Article.create(articleData)
    res.status(201).json({ success: true, data: article })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Approve pending article
router.patch('/:id/approve', authenticate, authorize(['admin']), async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const article = sampleArticles.find((item) => item.id === req.params.id)
      if (!article) return res.status(404).json({ success: false, error: 'Article not found' })
      article.status = 'published'
      return res.json({ success: true, data: article })
    }

    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ success: false, error: 'Article not found' })

    article.status = 'published'
    article.publishedAt = new Date()
    await article.save()

    res.json({ success: true, data: article })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Reject pending article
router.patch('/:id/reject', authenticate, authorize(['admin']), async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const article = sampleArticles.find((item) => item.id === req.params.id)
      if (!article) return res.status(404).json({ success: false, error: 'Article not found' })
      article.status = 'rejected'
      return res.json({ success: true, data: article })
    }

    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ success: false, error: 'Article not found' })

    article.status = 'rejected'
    await article.save()

    res.json({ success: true, data: article })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// PUT update article
router.put('/:id', authenticate, authorize(['admin', 'editor']), async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' })
    }

    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Unauthorized to edit this article' })
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.json({ success: true, data: updatedArticle })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// DELETE article
router.delete('/:id', authenticate, authorize(['admin', 'editor']), async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' })
    }

    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Unauthorized to delete this article' })
    }

    await article.deleteOne()
    res.json({ success: true, message: 'Article deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router
