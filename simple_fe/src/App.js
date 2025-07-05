import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://13.235.245.253:5000/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", department: "" });

  // Fetch filtered employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_URL}?search=${query}`);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [query]);

  // Handle form submission to add employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: "", email: "", department: "" });
      fetchEmployees();
    } catch (err) {
      alert("Error adding employee. Check if email already exists.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
      <h2>Employee Directory</h2>

      <input
        type="text"
        placeholder="Search by name or department"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      />

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            <b>{emp.name}</b> - {emp.department} - {emp.email}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Add Employee</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Department"
          required
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default App;
