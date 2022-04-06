// require mongoose
const mongoose = require('mongoose')

// connect to MongoDB
const connectDB = () => {
  try {
    
    mongoose.connect (process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('connected met mongoose')
  } catch (err) {
    console.log ('error bij het verbinden met de database',)
  }
 }

// export connectDB function 
module.exports = connectDB