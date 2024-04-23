// authenticationMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            req.user = decoded;
            next();
        });
    } else {
        return res.status(401).json({ error: 'Unauthorized, token required' });
    }
};

module.exports = { authenticateUser };