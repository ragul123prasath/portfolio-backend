"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Blogs Management</h1>

      <Link href="/blogs/create">
        <button style={{ marginBottom: "20px" }}>Add Blog</button>
      </Link>

      {blogs.map((blog) => (
        <div 
          key={blog._id} 
          style={{
            border: "1px solid #ddd", 
            padding: "15px", 
            marginBottom: "15px"
          }}
        >
          <h2>{blog.title}</h2>
          <p>{blog.summary}</p>

          {blog.image && (
            <img src={blog.image} width={200} style={{ marginTop: "10px" }} />
          )}

          <div style={{ marginTop: "10px" }}>
            <Link href={`/blogs/edit/${blog._id}`}>
              <button>Edit</button>
            </Link>

            <button 
              onClick={() => deleteBlog(blog._id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
