"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;

  const [project, setProject] = useState(null);
  const [image, setImage] = useState(null);

  const loadProject = async () => {
    const res = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
    setProject(res.data);
  };

  const uploadImage = async () => {
    if (!image) return project.image;
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://localhost:5000/api/upload", formData);
    return res.data.imageUrl;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();

    await axios.put(`http://localhost:5000/api/projects/${projectId}`, {
      ...project,
      image: imageUrl
    });

    router.push("/projects");
  };

  useEffect(() => {
    loadProject();
  }, []);

  if (!project) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Project</h1>

      <form onSubmit={handleUpdate} style={{ maxWidth: "500px" }}>
        
        <label>Project Title</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
        />

        <label>Description</label>
        <textarea
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />

        <label>Tech Stack</label>
        <input
          type="text"
          value={project.techStack.join(", ")}
          onChange={(e) =>
            setProject({
              ...project,
              techStack: e.target.value.split(",").map((t) => t.trim()),
            })
          }
        />

        <label>Demo Link</label>
        <input
          type="text"
          value={project.demoLink}
          onChange={(e) =>
            setProject({ ...project, demoLink: e.target.value })
          }
        />

        <label>GitHub Link</label>
        <input
          type="text"
          value={project.githubLink}
          onChange={(e) =>
            setProject({ ...project, githubLink: e.target.value })
          }
        />

        <label>Image (Upload new to replace)</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Update Project
        </button>
      </form>
    </div>
  );
}
