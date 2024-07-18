import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './connect/connect.js';
import { peopleRoutes } from './routes/peopleRoutes.js';  // Named import
import { userRoutes } from './routes/userRoutes.js';  // Named import
import { orderRoutes } from './routes/orderRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Setup
app.use(
    session({
        secret: "hello",
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
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
app.use('/api/users', userRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/order', orderRoutes);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
