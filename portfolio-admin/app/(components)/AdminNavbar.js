"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="w-full bg-white shadow p-4 fixed top-0 left-64 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <button 
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
