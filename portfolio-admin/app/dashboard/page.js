"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Welcome to Admin Dashboard</h1>
      <p>Your authentication worked successfully! 🎉</p>
    </div>
  );
}
