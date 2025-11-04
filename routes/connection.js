const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://tmorini:ZReIEHUPL6hIljnN@clusterlacapsule.spssdh4.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
