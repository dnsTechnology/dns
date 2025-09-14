// AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { UserCircle } from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white shadow-lg text-gray-800 p-4">
          <button
            className="rounded p-[2px] hover:cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <HiMenu className="w-6 h-6" />
          </button>
          <div className="avtar-stack">
            <UserCircle className="cursor-pointer" />
          </div>
        </header>

        {/* Outlet renders the nested admin pages */}
        <main className="flex-1 p-2 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
