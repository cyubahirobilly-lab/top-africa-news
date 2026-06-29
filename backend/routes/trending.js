const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { title: 'Election updates', slug: 'election-updates' },
      { title: 'Climate action', slug: 'climate-action' },
      { title: 'Sports highlights', slug: 'sports-highlights' },
    ],
  })
})

module.exports = router
