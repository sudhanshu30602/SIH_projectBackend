// username - vmourya350
// password - UkeK13DBDoXTiYnj
// dbuser
// 13YQrCILf8xzPX1m
// const uri = 'mongodb+srv://vmourya350:UkeK13DBDoXTiYnj@cluster0.yur5rgf.mongodb.net/?retryWrites=true&w=majority';

// db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
