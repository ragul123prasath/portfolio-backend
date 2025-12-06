"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateExperience() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/experience", {
      role,
      company,
      startDate,
      endDate,
      description,
    });

    router.push("/experience");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Experience</h1>

      <form onSubmit={submit} style={{ maxWidth: "500px" }}>
        
        <label>Role / Position</label>
        <input 
          type="text" 
          required 
          onChange={(e) => setRole(e.target.value)} 
        />

        <label>Company</label>
        <input 
          type="text" 
          required 
          onChange={(e) => setCompany(e.target.value)} 
        />

        <label>Start Date</label>
        <input 
          type="text" 
          placeholder="e.g., Jan 2022"
          required 
          onChange={(e) => setStartDate(e.target.value)} 
        />

        <label>End Date</label>
        <input 
          type="text" 
          placeholder="Leave empty if present"
          onChange={(e) => setEndDate(e.target.value)} 
        />

        <label>Description</label>
        <textarea 
          required 
          onChange={(e) => setDescription(e.target.value)} 
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Save Experience
        </button>
      </form>
    </div>
  );
}
