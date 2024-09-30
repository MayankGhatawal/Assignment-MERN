const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({ storage });

// server/routes/employee.js
router.post('/add', upload.single('photo'), async (req, res) => {
  const { name, email, phoneNo, designation, gender, courses } = req.body;

  // Validate input
  if (!name || !email || !phoneNo || !designation || !gender || !courses) {
      return res.status(400).json({ message: "All fields are required" });
  }

  try {
      const photo = req.file ? req.file.filename : null; // Check if file is uploaded
      const employee = new Employee({
          name,
          email,
          phoneNo,
          designation,
          gender,
          courses: courses.split(','), // Assuming courses are sent as a comma-separated string
          photo,
      });

      const newEmployee = await employee.save();
      res.status(201).json(newEmployee);
  } catch (error) {
      console.error("Error adding employee:", error);
      res.status(500).json({ message: error.message });
  }
});

// Fetch single employee by ID
router.get('/:id', async (req, res) => {
  try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
  } catch (error) {
      console.error("Error fetching employee:", error);
      res.status(500).json({ message: error.message });
  }
});

// Fetch all employees for a user
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Employee by ID (Read Single Employee)
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update Employee (Update)
router.put('/update/:id', upload.single('photo'), async (req, res) => {
  const { name, email, phoneNo, designation, gender, courses } = req.body;
  let photo = req.body.photo;

  if (req.file) {
    photo = req.file.filename;
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phoneNo,
        designation,
        gender,
        courses: courses ? courses.split(',') : [],
        photo
      },
      { new: true } // Return the updated document
    );

    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete Employee (Delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the employee ID from the request parameters
    const deletedEmployee = await Employee.findByIdAndDelete(id); // Delete the employee
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
