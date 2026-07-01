"use client";

import React from "react";

export default function LeadsPage() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4 shadow-sm animate-fadeIn">
      <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.707 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900">Leads Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Welcome to the Leads panel. Track sales pipeline, follow-ups, and prospective clients.
      </p>
    </div>
  );
}
