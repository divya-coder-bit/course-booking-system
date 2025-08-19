const mongoose = require('mongoose');
const connectDB = async () => {
    return mongoose.connect(process.env.LIVE_URL)
        .then(() => {
            console.log('database connection successful');
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = connectDB;

