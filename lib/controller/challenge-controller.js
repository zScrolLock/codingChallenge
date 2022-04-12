const { Router } = require('express');
const checkAuth = require('../../src/middleware/ensuredAuthenticate');
const challengeService = require('../service/challenge-service')
const router_challenge = Router()

router_challenge.get('/api/get-token', challengeService.getToken)

router_challenge.post('/api/get-forecast', checkAuth, challengeService.callMethod)

module.exports = router_challenge