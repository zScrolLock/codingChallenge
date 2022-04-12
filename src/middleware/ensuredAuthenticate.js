const jwt  = require('jsonwebtoken')
const dotenv = require('dotenv/config')

const checkAuth = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], `${process.env.JWTKEY}`);
        req.userData = decoded
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

module.exports = checkAuth
