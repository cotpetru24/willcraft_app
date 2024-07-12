const express = require('express');
const session = require('express-session');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const connectDb = require('./connect/connect');
const port = process.env.PORT || 5000;

connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Setup
app.use(
    session({
        // It holds the secret key for session
        secret: "hello",

        // Forces the session to be saved
        // back to the session store
        resave: true,

        // Forces a session that is "uninitialized"
        // to be saved to the store
        saveUninitialized: false,
        cookie: {
            // Session expires after 1 min of inactivity.
            maxAge: 60000 // Use maxAge instead of expires
        }
    })
);

// Example middleware to demonstrate session usage
app.use((req, res, next) => {
    if (!req.session.views) {
        req.session.views = 0;
    }
    req.session.views++;
    console.log(`Number of views: ${req.session.views}`);
    next();
});

// Your existing routes
app.use('/docs', require('./routes/docRoutes'));
app.use('/users', require('./routes/userRoutes'));

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
