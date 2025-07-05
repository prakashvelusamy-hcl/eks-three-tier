import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://13.235.245.253:5000/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", department: "" });

  // Fetch employees with optional query
  const fetchEmployees = async (search = "") => {
    try {
      const res = await axios.get(`${API_URL}?search=${search}`);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle search button click
  const handleSearch = () => {
    fetchEmployees(query);
  };

  // Handle form submission to add new employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: "", email: "", department: "" });
      fetchEmployees(); // Refresh list
    } catch (err) {
      alert("Error adding employee. Check if email already exists.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
      <h2>Employee Directory</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or department"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
          Search
        </button>
      </div>

      <ul>
        {employees.map((emp) => (
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
