import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState('');

  const fetchEmployees = async () => {
    const res = await axios.get(`/api/employees?search=${query}`);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [query]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Directory</h2>
      <input
        type="text"
        placeholder="Search name or department"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            <b>{emp.name}</b> - {emp.department} - {emp.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
