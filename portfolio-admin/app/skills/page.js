"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);

  // Fetch all skills
  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/skills");
      setSkills(res.data);
    } catch (error) {
      console.error("Error fetching skills", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Delete skill
  const deleteSkill = async (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/skills/${id}`);
      fetchSkills();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Skills Management</h1>

      <Link href="/skills/create">
        <button style={{ marginBottom: "20px" }}>Add Skill</button>
      </Link>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Skill Name</th>
            <th>Level (%)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
              <td>{skill.name}</td>
              <td>{skill.level}</td>
              <td>
                <Link href={`/skills/edit/${skill._id}`}>
                  <button>Edit</button>
                </Link>

                <button
                  onClick={() => deleteSkill(skill._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
