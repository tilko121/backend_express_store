// tokenGenerationLimiterMiddleware.js
const rateLimit = require('express-rate-limit');

const tokenGenerationLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 5 requests per windowMs
});

module.exports = { tokenGenerationLimiter };