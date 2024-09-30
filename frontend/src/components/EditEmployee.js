// src/components/EditEmployee.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateEmployee } from '../api/employeeService';

const EditEmployee = ({ employees }) => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const emp = employees.find(emp => emp._id === id);
      if (emp) {
        setEmployee(emp);
      } else {
        setError('Employee not found');
      }
    };

    fetchEmployee();
  }, [id, employees]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(employee._id, employee);
      alert('Employee updated successfully!');
    } catch (error) {
      alert('Failed to update employee');
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
      <input
        type="text"
        value={employee.name}
        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        value={employee.email}
        onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={employee.phoneNo}
        onChange={(e) => setEmployee({ ...employee, phoneNo: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={employee.designation}
        onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <select
        value={employee.gender}
        onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
        className="border p-2 mb-2 w-full"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="text"
        value={employee.course}
        onChange={(e) => setEmployee({ ...employee, course: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={employee.photo}
        onChange={(e) => setEmployee({ ...employee, photo: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Employee</button>
    </form>
  );
};

export default EditEmployee;
