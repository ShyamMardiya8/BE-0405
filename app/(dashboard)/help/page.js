"use client";

import React from "react";

export default function HelpPage() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4 shadow-sm animate-fadeIn">
      <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900">Help & Support Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Welcome to the Help and Support panel. Find user guides, contact administrators, or report bugs.
      </p>
    </div>
  );
}
