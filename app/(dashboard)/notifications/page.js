"use client";

import React from "react";

export default function NotificationsPage() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4 shadow-sm animate-fadeIn">
      <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900">Notifications Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Welcome to the Notifications panel. All alerts and messages appear here.
      </p>
    </div>
  );
}
