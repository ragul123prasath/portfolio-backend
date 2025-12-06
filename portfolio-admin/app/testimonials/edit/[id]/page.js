"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditTestimonial() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [item, setItem] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const loadItem = async () => {
    const res = await axios.get(`http://localhost:5000/api/testimonials/${id}`);
    setItem(res.data);
  };

  useEffect(() => {
    loadItem();
  }, []);

  const uploadImage = async () => {
    if (!newImage) return item.image;

    const form = new FormData();
    form.append("image", newImage);

    const res = await axios.post("http://localhost:5000/api/upload", form);
    return res.data.imageUrl;
  };

  const updateItem = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    await axios.put(`http://localhost:5000/api/testimonials/${id}`, {
      ...item,
      image: imageUrl,
    });

    router.push("/testimonials");
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Testimonial</h1>

      <form onSubmit={updateItem} style={{ maxWidth: "500px" }}>
        
        <label>Name</label>
        <input
          type="text"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />

        <label>Message</label>
        <textarea
          value={item.message}
          onChange={(e) => setItem({ ...item, message: e.target.value })}
        />

        <label>Replace Image</label>
        <input 
          type="file" 
          onChange={(e) => setNewImage(e.target.files[0])}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Update
        </button>
      </form>
    </div>
  );
}
