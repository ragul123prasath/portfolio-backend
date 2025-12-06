"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddAbout() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/about", {
      title,
      description
    });
    router.push("/about");
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-xl mb-4">Add About</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
}
