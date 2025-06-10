const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://rakesh:Rakesh%402231@inotebook.b1q2oby.mongodb.net/";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully ✅");
    }
    catch (error) { 
        console.error("Error occurred while connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;