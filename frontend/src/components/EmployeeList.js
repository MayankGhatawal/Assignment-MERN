// // src/components/EmployeeList.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate(); // For navigation

//   // Fetch employees
//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get('/api/employees');
//       setEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees(); // Fetch employees on component mount
//   }, []);

//   // Function to handle delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/employees/${id}`);
//       fetchEmployees(); // Refresh employee list
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-4">Employee List</h1>
//       <table className="min-w-full border">
//         <thead>
//           <tr>
//             <th className="border p-2">Photo</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone No</th>
//             <th className="border p-2">Designation</th>
//             <th className="border p-2">Gender</th>
//             <th className="border p-2">Courses</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee._id}>
//               <td className="border p-2">
//                 <img src={`/uploads/${employee.photo}`} alt={employee.name} className="h-16" />
//               </td>
//               <td className="border p-2">{employee.name}</td>
//               <td className="border p-2">{employee.email}</td>
//               <td className="border p-2">{employee.phoneNo}</td>
//               <td className="border p-2">{employee.designation}</td>
//               <td className="border p-2">{employee.gender}</td>
//               <td className="border p-2">{employee.courses.join(', ')}</td>
//               <td className="border p-2">
//                 <button onClick={() => handleDelete(employee._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
//                 {/* You can add edit functionality here */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button 
//         onClick={() => navigate('/add-employee')} 
//         className="mb-4 bg-blue-500 text-white p-2 rounded mt-4"
//       >
//         Add Employee
//       </button>
//     </div>
//   );
// };

// export default EmployeeList;
// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Employee List</h2>
      <Link to="/addEmployee" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Add Employee</Link>
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
              <ul>
        {employees.map(emp => (
          <li key={emp._id}>
            <Link to={`/editEmployee/${emp._id}`}>Edit</Link> {emp.name}
          </li>
        ))}
      </ul>
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
