"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ExperiencePage() {
  const [items, setItems] = useState([]);

  const fetchExperience = async () => {
    const res = await axios.get("http://localhost:5000/api/experience");
    setItems(res.data);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const deleteItem = async (id) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    await axios.delete(`http://localhost:5000/api/experience/${id}`);
    fetchExperience();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Experience Management</h1>

      <Link href="/experience/create">
        <button style={{ marginBottom: "20px" }}>Add Experience</button>
      </Link>

      {items.map((exp) => (
        <div 
          key={exp._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px"
          }}
        >
          <h2>{exp.role}</h2>
          <p>{exp.company}</p>
          <p>
            {exp.startDate} - {exp.endDate || "Present"}
          </p>
          <p>{exp.description}</p>

          <div style={{ marginTop: "10px" }}>
            <Link href={`/experience/edit/${exp._id}`}>
              <button>Edit</button>
            </Link>

            <button 
              onClick={() => deleteItem(exp._id)}
              style={{ color: "red", marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
