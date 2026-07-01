"use client";

import React from "react";

export default function TasksPage() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4 shadow-sm animate-fadeIn">
      <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900">Tasks Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Welcome to the Tasks panel. Assign service tickets and track progress of technician tasks.
      </p>
    </div>
  );
}
