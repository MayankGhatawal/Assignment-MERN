import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // const handleEdit = (id) => {
  //   navigate(`/editEmployee/${id}`);
  // };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Employee List</h2>
      <Link to="/add-Employee" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Add Employee</Link>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b">Name</th>
            <th className="border-b">Email</th>
            <th className="border-b">Phone</th>
            <th className="border-b">Designation</th>
            <th className="border-b">Gender</th>
            <th className="border-b">Courses</th>
            <th className="border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td className="border-b">{employee.name}</td>
              <td className="border-b">{employee.email}</td>
              <td className="border-b">{employee.phoneNo}</td>
              <td className="border-b">{employee.designation}</td>
              <td className="border-b">{employee.gender}</td>
              <td className="border-b">{employee.courses.join(', ')}</td>
              <td className="border-b">
              <Link to={`/editEmployee/${employee._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(employee._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
