const API_URL = 'http://localhost:5000/api/employees';

// Get Employees
const getEmployees = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: config.headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    throw error;
  }
};

// Add Employee
const addEmployee = async (employeeData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding employee:', error.message);
    throw error;
  }
};

// Update Employee
const updateEmployee = async (id, employeeData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${API_URL}/update/${id}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error('Failed to update employee');
  }

  return await response.json();
};

// Delete Employee
const deleteEmployee = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    });

    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    throw error;
  }
};

export { getEmployees, addEmployee, updateEmployee, deleteEmployee };
