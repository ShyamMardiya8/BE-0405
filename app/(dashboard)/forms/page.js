"use client";

import React from "react";

export default function FormsPage() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4 shadow-sm animate-fadeIn">
      <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900">Forms Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Welcome to the Forms panel. Create customer checklist templates and review submissions.
      </p>
    </div>
  );
}
