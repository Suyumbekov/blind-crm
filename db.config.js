// config.js
require("dotenv").config();

const config = {
  mongodb: {
    url: process.env.DB_URL, // MongoDB connection URL
    dbName: process.env.DB_NAME, // Name of your MongoDB database
    options: {
      useNewUrlParser: true, // Parse connection string using new parser
      useUnifiedTopology: true, // Use new Server Discovery and Monitoring engine
    },
  },
};

module.exports = config;
