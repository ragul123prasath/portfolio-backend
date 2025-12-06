"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateProject() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [techStack, setTechStack] = useState("");
  const [image, setImage] = useState(null);

  // Upload image to backend
  const uploadImage = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://localhost:5000/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    await axios.post("http://localhost:5000/api/projects", {
      title,
      description,
      demoLink,
      githubLink,
      techStack: techStack.split(",").map((t) => t.trim()),
      image: imageUrl
    });

    router.push("/projects");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Project</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        
        <label>Project Title</label>
        <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Tech Stack (comma separated)</label>
        <input
          type="text"
          placeholder="React, Node.js, MongoDB"
          onChange={(e) => setTechStack(e.target.value)}
        />

        <label>Demo Link</label>
        <input
          type="text"
          onChange={(e) => setDemoLink(e.target.value)}
        />

        <label>GitHub Link</label>
        <input
          type="text"
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <label>Project Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Save Project
        </button>
      </form>
    </div>
  );
}
