const express = require('express')
const dotenv = require('dotenv/config')
const cors = require('cors')

// CONTROLLER CHALLENGE IMPORT 
const challengeController = require('../lib/controller/challenge-controller')

const app = express();
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use('/', challengeController)

app.listen(process.env.PORT, () => console.log(`Server Side is Running on ${process.env.PORT}`))