const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: String,
});

const Worker = mongoose.model("worker", workerSchema);

module.exports = Worker;
