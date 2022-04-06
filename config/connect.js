//database connect file
const mongoose = require('mongoose');

const connectDB = () => {
    try {
         mongoose.createConnection (process.env.MONGO_URI,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }
          );
          console.log('connected to the database via mongoose'); 
    } catch (err) {
        console.log("failed to connect to the database");
    }
};

module.exports = connectDB;

