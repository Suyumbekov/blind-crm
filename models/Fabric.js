const mongoose = require("mongoose");

const fabricSchema = new mongoose.Schema({
  name: String,
  amount: Number,
});

const Fabric = mongoose.model("fabric", fabricSchema);

module.exports = Fabric;
