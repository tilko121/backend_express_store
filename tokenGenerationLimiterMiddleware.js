// tokenGenerationLimiterMiddleware.js
const rateLimit = require('express-rate-limit');

const tokenGenerationLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10 // limit each IP to 5 requests per windowMs
});

module.exports = { tokenGenerationLimiter };