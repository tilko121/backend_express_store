// tokenGenerationAuthenticationMiddleware.js
require('dotenv').config();

const authenticateGenerator = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, token required' });
    }
    if (token !== process.env.DIRECT_ACCESS) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

module.exports = { authenticateGenerator };