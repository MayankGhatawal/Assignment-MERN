import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phoneNo: '',
    designation: '',
    gender: '',
    courses: [],
    photo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'courses') {
      const currentCourses = employee.courses;
      if (currentCourses.includes(value)) {
        setEmployee({
          ...employee,
          courses: currentCourses.filter(course => course !== value)
        });
      } else {
        setEmployee({
          ...employee,
          courses: [...currentCourses, value]
        });
      }
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in employee) {
      formDataToSend.append(key, employee[key]);
    }
    try {
      await axios.post('http://localhost:5000/api/employees/add', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        name="phoneNo"
        placeholder="Phone Number"
        value={employee.phoneNo}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />

      <select
        name="designation"
        value={employee.designation}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      >
        <option value="">Select Designation</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>

      <fieldset className="mb-4">
        <legend className="font-semibold">Gender</legend>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={employee.gender === 'Male'}
            onChange={handleChange}
            className="mr-2"
          />
          Male
        </label><br/>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={employee.gender === 'Female'}
            onChange={handleChange}
            className="mr-2"
          />
          Female
        </label>
      </fieldset>

      <fieldset className="mb-4">
        <legend className="font-semibold">Courses</legend>
        <label>
          <input
            type="checkbox"
            name="courses"
            value="MCA"
            checked={employee.courses.includes('MCA')}
            onChange={handleChange}
            className="mr-2"
          />
          MCA
        </label><br/>
        <label>
          <input
            type="checkbox"
            name="courses"
            value="BCA"
            checked={employee.courses.includes('BCA')}
            onChange={handleChange}
            className="mr-2"
          />
          BCA
        </label><br/>
        <label>
          <input
            type="checkbox"
            name="courses"
            value="BSC"
            checked={employee.courses.includes('BSC')}
            onChange={handleChange}
            className="mr-2"
          />
          BSC
        </label>
      </fieldset>

      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 mb-2 w-full"
        required
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ml-36">
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployee;
