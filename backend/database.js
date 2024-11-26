const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            'mongodb+srv://radiannavarro:V9X9UZVTe3LZshlg@test.fspem.mongodb.net/?retryWrites=true&w=majority&appName=test'
        );
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }

};

module.exports = connectDB;