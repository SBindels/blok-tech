//database connect file

const mongoose = require('mongoose');

//proberen mongoose ipv mongodb voor passport


const connectDB = async() => {
    try {
        await mongoose.connect(
            "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@datingapp.abpqe.mongodb.net/test",
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }
          );
          console.log('connected to the database via mongoose'), 
    } catch (err) {
        console.log("failed to connect to the database");
    }
};

