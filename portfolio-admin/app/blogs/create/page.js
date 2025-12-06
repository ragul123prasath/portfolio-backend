"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://localhost:5000/api/upload", formData);
    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    await axios.post("http://localhost:5000/api/blogs", {
      title,
      summary,
      content,
      image: imageUrl,
    });

    router.push("/blogs");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Blog</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>

        <label>Title</label>
        <input 
          type="text" 
          required 
          onChange={(e) => setTitle(e.target.value)} 
        />

        <label>Summary</label>
        <input 
          type="text" 
          required 
          onChange={(e) => setSummary(e.target.value)} 
        />

        <label>Content</label>
        <textarea 
          required 
          onChange={(e) => setContent(e.target.value)}
        />

        <label>Blog Image</label>
        <input type="file"
               onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" style={{ marginTop: "20px" }}>
          Save Blog
        </button>

      </form>
    </div>
  );
}
