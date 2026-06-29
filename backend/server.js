const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('./models/User')
require('dotenv').config()

const app = express()

// Security Middleware
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '50mb' }))

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
app.use('/api', limiter)

// Routes
const articleRoutes = require('./routes/articles')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/categories')
const trendingRoutes = require('./routes/trending')

app.use('/api/articles', articleRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/trending', trendingRoutes)

// Database Connection
let mongoServer

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/topafricanews'

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`Connected to MongoDB at ${uri}`)
  } catch (error) {
    console.warn('Primary MongoDB connection failed. Trying in-memory fallback.', error.message)

    try {
      mongoServer = await MongoMemoryServer.create()
      await mongoose.connect(mongoServer.getUri(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log(`Connected to in-memory MongoDB at ${mongoServer.getUri()}`)
    } catch (fallbackError) {
      console.warn('MongoDB fallback is unavailable. Continuing without a database for local development.', fallbackError.message)
    }
  }
}

connectToDatabase().then(async () => {
  if (mongoose.connection.readyState !== 1) return

  try {
    const count = await User.countDocuments()
    if (count > 0) return

    const defaultUsers = [
      { name: 'System Admin', email: 'admin@topafrica.news', password: 'admin123', role: 'admin' },
      { name: 'Reporter One', email: 'reporter@topafrica.news', password: 'reporter123', role: 'reporter' },
    ]

    await User.insertMany(defaultUsers)
    console.log('Seeded default users: admin@topafrica.news / admin123 and reporter@topafrica.news / reporter123')
  } catch (error) {
    console.warn('Default user seeding failed.', error.message)
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})