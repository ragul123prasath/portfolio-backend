"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateService() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);

  const uploadIcon = async () => {
    if (!icon) return null;

    const form = new FormData();
    form.append("image", icon);

    const res = await axios.post("http://localhost:5000/api/upload", form);
    return res.data.imageUrl;
  };

  const submit = async (e) => {
    e.preventDefault();

    const iconUrl = await uploadIcon();

    await axios.post("http://localhost:5000/api/services", {
      name,
      description,
      icon: iconUrl,
    });

    router.push("/services");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Service</h1>

      <form onSubmit={submit} style={{ maxWidth: "500px" }}>
        
        <label>Service Name</label>
        <input 
          required 
          type="text" 
          onChange={(e) => setName(e.target.value)} 
        />

        <label>Description</label>
        <textarea 
          required 
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Icon (optional)</label>
        <input 
          type="file"
          onChange={(e) => setIcon(e.target.files[0])}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Save Service
        </button>
      </form>
    </div>
  );
}
