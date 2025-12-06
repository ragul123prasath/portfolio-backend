"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditAbout({ params }) {
  const { id } = params;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchItem = async () => {
    const res = await axios.get(`http://localhost:5000/api/about/${id}`);
    setTitle(res.data.title);
    setDescription(res.data.description);
  };

  const update = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/about/${id}`, {
      title,
      description,
    });
    router.push("/about");
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-bold text-xl mb-4">Edit About</h1>

      <form onSubmit={update} className="space-y-4">
        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2">
          Update
        </button>
      </form>
    </div>
  );
}
