const mongoose = require('mongoose');

async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
}

module.exports = { connectToDatabase };
