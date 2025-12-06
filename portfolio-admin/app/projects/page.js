"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects");
    setProjects(res.data);
  };

  const deleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    await axios.delete(`http://localhost:5000/api/projects/${id}`);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Projects Management</h1>

      <Link href="/projects/create">
        <button style={{ marginBottom: "20px" }}>
          Add Project
        </button>
      </Link>

      <div style={{ marginTop: "20px" }}>
        {projects.map((project) => (
          <div
            key={project._id}
            style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "15px" }}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>

            {project.image && (
              <img
                src={project.image}
                width={200}
                style={{ marginTop: "10px" }}
              />
            )}

            <div style={{ marginTop: "10px" }}>
              <Link href={`/projects/edit/${project._id}`}>
                <button>Edit</button>
              </Link>

              <button
                onClick={() => deleteProject(project._id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
