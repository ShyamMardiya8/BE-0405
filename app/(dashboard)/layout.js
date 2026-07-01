"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import services from "../features/index";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // 1. Check local storage token first if state is not set
    let activeToken = token;
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        router.push("/login");
        return;
      }
      activeToken = storedToken;
    }

    // 2. Fetch linked company details based on the cookie (accessToken)
    dispatch(services.fetchCompanyDetails());
  }, [dispatch, token, router]);

  return (
    <div className="min-h-screen w-full flex bg-[#edf2f7] font-sans text-slate-800 antialiased overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Bar */}
        <Header />

        {/* Dynamic Inner Page viewport */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
