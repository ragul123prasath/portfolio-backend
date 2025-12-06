import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block hover:text-gray-300">Dashboard</Link>
        <Link href="/about" className="block hover:text-gray-300">About</Link>
        <Link href="/skills" className="block hover:text-gray-300">Skills</Link>
        <Link href="/projects" className="block hover:text-gray-300">Projects</Link>
        <Link href="/blogs" className="block hover:text-gray-300">Blogs</Link>
        <Link href="/experience" className="block hover:text-gray-300">Experience</Link>
        <Link href="/testimonials" className="block hover:text-gray-300">Testimonials</Link>
        <Link href="/services" className="block hover:text-gray-300">Services</Link>
      </nav>
    </div>
  );
}
