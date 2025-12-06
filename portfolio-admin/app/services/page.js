"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    await axios.delete(`http://localhost:5000/api/services/${id}`);
    fetchServices();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Services Management</h1>

      <Link href="/services/create">
        <button style={{ marginBottom: "20px" }}>Add Service</button>
      </Link>

      {services.map((service) => (
        <div 
          key={service._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px"
          }}
        >
          <h2>{service.name}</h2>
          <p>{service.description}</p>

          {service.icon && (
            <img 
              src={service.icon} 
              width={80} 
              style={{ marginTop: "10px" }}
            />
          )}

          <div style={{ marginTop: "10px" }}>
            <Link href={`/services/edit/${service._id}`}>
              <button>Edit</button>
            </Link>

            <button 
              onClick={() => deleteService(service._id)}
              style={{ color: "red", marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
