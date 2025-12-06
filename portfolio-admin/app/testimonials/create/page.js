"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateTestimonial() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    if (!image) return null;

    const form = new FormData();
    form.append("image", image);

    const res = await axios.post("http://localhost:5000/api/upload", form);
    return res.data.imageUrl;
  };

  const submit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    await axios.post("http://localhost:5000/api/testimonials", {
      name,
      message,
      image: imageUrl,
    });

    router.push("/testimonials");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Testimonial</h1>

      <form onSubmit={submit} style={{ maxWidth: "500px" }}>
        <label>Name</label>
        <input type="text" required onChange={(e) => setName(e.target.value)} />

        <label>Message</label>
        <textarea required onChange={(e) => setMessage(e.target.value)} />

        <label>Image (optional)</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" style={{ marginTop: "20px" }}>Save</button>
      </form>
    </div>
  );
}
