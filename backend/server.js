const express = require('express');
const {errorHandler} = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const connectDb = require('./connect/connect');
const port = process.env.PORT || 5000;


connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/docs', require('./routes/docRoutes'))
app.use('/user', require('./routes/userRoutes'))

app.use(errorHandler);

app.listen(port, () => console.log(`server is listening on port ${port}`))
