"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditService() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [service, setService] = useState(null);
  const [newIcon, setNewIcon] = useState(null);

  const loadService = async () => {
    const res = await axios.get(`http://localhost:5000/api/services/${id}`);
    setService(res.data);
  };

  useEffect(() => {
    loadService();
  }, []);

  const uploadIcon = async () => {
    if (!newIcon) return service.icon;

    const form = new FormData();
    form.append("image", newIcon);

    const res = await axios.post("http://localhost:5000/api/upload", form);
    return res.data.imageUrl;
  };

  const updateService = async (e) => {
    e.preventDefault();

    const iconUrl = await uploadIcon();

    await axios.put(`http://localhost:5000/api/services/${id}`, {
      ...service,
      icon: iconUrl,
    });

    router.push("/services");
  };

  if (!service) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Service</h1>

      <form onSubmit={updateService} style={{ maxWidth: "500px" }}>
        
        <label>Service Name</label>
        <input
          type="text"
          value={service.name}
          onChange={(e) => setService({ ...service, name: e.target.value })}
        />

        <label>Description</label>
        <textarea
          value={service.description}
          onChange={(e) => setService({ ...service, description: e.target.value })}
        />

        <label>Replace Icon (optional)</label>
        <input 
          type="file"
          onChange={(e) => setNewIcon(e.target.files[0])}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Update Service
        </button>
      </form>
    </div>
  );
}
