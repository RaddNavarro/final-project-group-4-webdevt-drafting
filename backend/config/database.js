const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(db);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

};

module.exports = connectDB;