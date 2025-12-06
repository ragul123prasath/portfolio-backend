"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateSkill() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/skills", {
        name,
        level,
      });

      router.push("/skills");
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Skill</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Skill Name</label>
        <input
          type="text"
          placeholder="Ex: JavaScript"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Skill Level (%)</label>
        <input
          type="number"
          placeholder="Ex: 90"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Save Skill
        </button>
      </form>
    </div>
  );
}
