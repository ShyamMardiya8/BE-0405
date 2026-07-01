"use client";

import React from "react";

export default function VisitsPage() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4 shadow-sm animate-fadeIn">
      <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900">Visits Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Welcome to the Visits panel. Review scheduled client visits and technician dispatch metrics.
      </p>
    </div>
  );
}
