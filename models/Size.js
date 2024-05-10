const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  dimensions: [[Number]], // Array of arrays of numbers
});

const Size = mongoose.model("size", sizeSchema);

module.exports = Size;
