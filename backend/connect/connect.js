const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${connect.connection.host}`);
    }
    catch (error) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;