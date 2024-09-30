const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: Number, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: [String], required: true },
  photo: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
