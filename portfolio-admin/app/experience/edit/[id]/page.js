"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditExperience() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [item, setItem] = useState(null);

  const loadExperience = async () => {
    const res = await axios.get(`http://localhost:5000/api/experience/${id}`);
    setItem(res.data);
  };

  useEffect(() => {
    loadExperience();
  }, []);

  const update = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/api/experience/${id}`, item);

    router.push("/experience");
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Experience</h1>

      <form onSubmit={update} style={{ maxWidth: "500px" }}>
        
        <label>Role / Position</label>
        <input
          type="text"
          value={item.role}
          onChange={(e) => setItem({ ...item, role: e.target.value })}
        />

        <label>Company</label>
        <input
          type="text"
          value={item.company}
          onChange={(e) => setItem({ ...item, company: e.target.value })}
        />

        <label>Start Date</label>
        <input
          type="text"
          value={item.startDate}
          onChange={(e) => setItem({ ...item, startDate: e.target.value })}
        />

        <label>End Date</label>
        <input
          type="text"
          value={item.endDate}
          onChange={(e) => setItem({ ...item, endDate: e.target.value })}
        />

        <label>Description</label>
        <textarea
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Update Experience
        </button>
      </form>
    </div>
  );
}
