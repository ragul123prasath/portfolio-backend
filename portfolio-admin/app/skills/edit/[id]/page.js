"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditSkill() {
  const router = useRouter();
  const params = useParams();

  const skillId = params.id;

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");

  // Load existing skill data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/skills/${skillId}`)
      .then((res) => {
        setName(res.data.name);
        setLevel(res.data.level);
      })
      .catch((err) => console.log(err));
  }, [skillId]);

  // Update skill
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/skills/${skillId}`, {
        name,
        level,
      });

      router.push("/skills");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Skill</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Skill Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Skill Level (%)</label>
        <input
          type="number"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Update Skill
        </button>
      </form>
    </div>
  );
}
