import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState('');

  const API_BASE = window._env_?.REACT_APP_API_BASE_URL || '/api';

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/employees?search=${query}`);
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [query]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Directory</h2>
      <input
        type="text"
        placeholder="Search by name or department"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '5px', width: '300px' }}
      />
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            <strong>{emp.name}</strong> — {emp.department} — {emp.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
