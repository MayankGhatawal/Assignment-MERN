import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = ({ employees }) => {
  const { id } = useParams();  // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Use this for redirection after editing

  useEffect(() => {
    if (employees && Array.isArray(employees)) {
      const emp = employees.find(emp => emp._id === id);
      if (emp) {
        setEmployee(emp);
      } else {
        setError('Employee not found');
      }
    }
  }, [id, employees]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Send updated data to backend
      const response = await fetch(`http://localhost:5000/api/employees/update/${employee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      alert('Employee updated successfully!');
      navigate('/employeeList');  // Redirect to employee list after successful update
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
        placeholder="Name"
      />
      <input
        type="email"
        value={employee.email}
        onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        className="border p-2 mb-2 w-full"
        placeholder="Email"
      />
      <input
        type="text"
        value={employee.phoneNo}
        onChange={(e) => setEmployee({ ...employee, phoneNo: e.target.value })}
        className="border p-2 mb-2 w-full"
        placeholder="Phone Number"
      />
      <input
        type="text"
        value={employee.designation}
        onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
        className="border p-2 mb-2 w-full"
        placeholder="Designation"
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
        placeholder="Course"
      />
      <input
        type="text"
        value={employee.photo}
        onChange={(e) => setEmployee({ ...employee, photo: e.target.value })}
        className="border p-2 mb-2 w-full"
        placeholder="Photo URL"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Employee</button>
    </form>
  );
};

export default EditEmployee;
