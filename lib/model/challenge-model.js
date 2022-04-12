const mongoose = require('mongoose')
const connection = require('../database/conn')

// MODEL COLLECTION MONGODB - 
const challengeSchema = new mongoose.Schema({
    _id: {
        localeId: String,
        date: String,
    },
    content: {}
}, { timestamps: true, collection: 'challenge', typeKey: '$type', versionKey: false, minimize: false})

module.exports = connection.model('challenge', challengeSchema)