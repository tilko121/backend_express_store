require('dotenv').config();

const express = require('express'); // Used to create the server
const { Op } = require('sequelize'); // Correctly import Op
const sequelize = require('./sequelize'); //Import sequelize from our sequelize.js file
const { authenticateUser } = require('./authenticationMiddleware');
const { authenticateGenerator} = require('./tokenGenerationAuthenticationMiddleware');
const { errorHandler } = require('./errorHandlingMiddleware');
const { limiter } = require('./rateLimitingMiddleware');
const routes = require('./routes');
const session = require('express-session'); //used for session tracking
const RedisStore = require('connect-redis').default; //connection to redis
const redis = require('redis');
const cookieParser = require('cookie-parser'); //used to pass JWT token in a cookie
const uuid = require('uuid');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Configure Redis client
const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
redisClient.connect().catch(console.error);

app.use(cookieParser());

// Instantiate RedisStore
const store = new RedisStore({ client: redisClient });

// Session configuration using Redis
app.use(session({
    store: store,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        maxAge: 3600000 //1h //86400000 // 24 hours
    }
}));

app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = uuid.v4();
  }
  next();
});

app.use(express.json());

// Sync Sequelize models with the database

const TransactionType = require('./models/TransactionType');
const TransactionStatus = require('./models/TransactionStatus');
const Currency = require('./models/Currency');
const PaymentMethod = require('./models/PaymentMethod');
const Merchant = require('./models/Merchant');

const Product = require('./models/Product');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Transaction.belongsTo(TransactionType, { foreignKey: 'typeId' });
Transaction.belongsTo(TransactionStatus, { foreignKey: 'statusId' });
Transaction.belongsTo(Currency, { foreignKey: 'currencyId' });
Transaction.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });
Transaction.belongsTo(Merchant, { foreignKey: 'merchantId' });

const { tokenGenerationLimiter } = require('./tokenGenerationLimiterMiddleware');

app.use("/register", authenticateGenerator);
app.use("/login", authenticateGenerator);

app.get('/', tokenGenerationLimiter, (req, res) => {
    if(!req.session.userId) {
        req.session.userId = uuid.v4();
        res.send('Session initialized with ID: ' + req.session.userId);
    }
    res.send('Session ID: ' + req.session.userId);
})

// Route handler for user registration
app.post('/register', tokenGenerationLimiter, async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId || uuid.v4();
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('sessionId', sessionId, {httpOnly: true, secure: process.env.NODE_ENV === 'production'})
        res.json({ token, user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route handler for user authentication
app.post('/login', tokenGenerationLimiter, async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId || uuid.v4();

        // Extract user input from request body
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({
            where : { username: username }
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        await user.update({ last_login: new Date() });

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('sessionId', sessionId, {httpOnly: true, secure: process.env.NODE_ENV === 'production'})

        // Return the token and user details in the response
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Use authentication middleware for all routes
app.use('/api', authenticateUser);

// Apply rate limiter to all requests
app.use('/api', limiter);

// Mount routes
app.use('/api', routes);

// Use error handling middleware
app.use(errorHandler);

// Sync Sequelize models with the database
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});