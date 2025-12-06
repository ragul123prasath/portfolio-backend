import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminSidebar />

      <div className="ml-64">
        <AdminNavbar />
        <div className="pt-20 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
