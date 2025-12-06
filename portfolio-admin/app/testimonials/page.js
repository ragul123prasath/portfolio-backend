"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function TestimonialsPage() {
  const [items, setItems] = useState([]);

  const fetchTestimonials = async () => {
    const res = await axios.get("http://localhost:5000/api/testimonials");
    setItems(res.data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const deleteItem = async (id) => {
    if (!confirm("Delete this testimonial?")) return;

    await axios.delete(`http://localhost:5000/api/testimonials/${id}`);
    fetchTestimonials();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Testimonials Management</h1>

      <Link href="/testimonials/create">
        <button style={{ marginBottom: "20px" }}>Add Testimonial</button>
      </Link>

      {items.map((t) => (
        <div 
          key={t._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px"
          }}
        >
          <h2>{t.name}</h2>
          <p>{t.message}</p>

          {t.image && (
            <img 
              src={t.image} 
              width={150} 
              style={{ marginTop: "10px" }} 
            />
          )}

          <div style={{ marginTop: "10px" }}>
            <Link href={`/testimonials/edit/${t._id}`}>
              <button>Edit</button>
            </Link>

            <button 
              onClick={() => deleteItem(t._id)}
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
