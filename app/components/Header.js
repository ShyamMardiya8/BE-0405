"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Slices/authSlice";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Resolve Title from Pathname
  const getTitle = () => {
    if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
    const section = pathname.split("/").filter(Boolean)[0] || "";
    if (!section) return "UpTeams";
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  const todayStr = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-slate-900">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Date Display */}
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
          <span>{todayStr}</span>
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
          <span>All</span>
          <svg
            className="w-3.5 h-3.5 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Logout Action Button */}
        <button
          onClick={handleLogout}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all flex items-center gap-1.5 text-xs font-bold"
          title="Sign Out"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
