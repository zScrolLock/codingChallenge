const mongoose = require('mongoose');
const dotenv = require('dotenv/config');

mongoose.connect(process.env.MONGO_URL_KEY);

module.exports = mongoose;