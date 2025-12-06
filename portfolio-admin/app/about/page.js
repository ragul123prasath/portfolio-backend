"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../(components)/AdminLayout";

export default function AboutPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/about");
    setData(res.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/about/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-xl font-bold mb-4">About Section</h1>

        <a
          className="bg-black text-white px-4 py-2 rounded"
          href="/about/create"
        >
          Add About
        </a>

        <div className="mt-6 space-y-4">
          {data.map((item) => (
            <div key={item._id} className="p-4 border rounded shadow">
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p className="mt-2">{item.description}</p>

              <div className="mt-4 flex gap-4">
                <a
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  href={`/about/edit/${item._id}`}
                >
                  Edit
                </a>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
