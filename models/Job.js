const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  id: String,
  poster: String,
  title: String,
  
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
