const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//job schema
const jobSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
  },
  weeklyHours: {
    type: Number,
    required: true,
  },
  hourlyWage: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("employees", userSchema);
const job = mongoose.model("job", jobSchema);
module.exports = { user, job };
