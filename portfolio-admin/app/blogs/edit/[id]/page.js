"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [blog, setBlog] = useState(null);
  const [image, setImage] = useState(null);

  const loadBlog = async () => {
    const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
    setBlog(res.data);
  };

  useEffect(() => {
    loadBlog();
  }, []);

  const uploadImage = async () => {
    if (!image) return blog.image;

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://localhost:5000/api/upload", formData);
    return res.data.imageUrl;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    await axios.put(`http://localhost:5000/api/blogs/${id}`, {
      ...blog,
      image: imageUrl,
    });

    router.push("/blogs");
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Blog</h1>

      <form onSubmit={handleUpdate} style={{ maxWidth: "500px" }}>

        <label>Title</label>
        <input 
          type="text"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />

        <label>Summary</label>
        <input 
          type="text"
          value={blog.summary}
          onChange={(e) => setBlog({ ...blog, summary: e.target.value })}
        />

        <label>Content</label>
        <textarea
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
        />

        <label>Replace Image (optional)</label>
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Update Blog
        </button>

      </form>
    </div>
  );
}
