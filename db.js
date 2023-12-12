const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongo_URL).then(
     () => {
          console.log("Connected with database ");
     }
).catch((err)=>{
      console.log('Error connecting to database ' + err);
})


const jwtSecret = process.env.JWT_SECRET;