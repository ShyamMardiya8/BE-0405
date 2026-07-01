"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function SettingsPage() {
  const [activeSettingsTab, setActiveSettingsTab] = useState("Company Profile");

  // Dynamic Redux States
  const { user } = useSelector((state) => state.auth);
  const { companyDetails, loading } = useSelector((state) => state.company);

  // General Company info states
  const [brandName, setBrandName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [website, setWebsite] = useState("");

  // Billing settings states
  const [billingName, setBillingName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");

  // Visit Settings list states
  const [visitPurposes, setVisitPurposes] = useState([]);
  const [newPurpose, setNewPurpose] = useState("");
  const [feedbackTypes, setFeedbackTypes] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [taskTypes, setTaskTypes] = useState([]);
  const [newTaskType, setNewTaskType] = useState("");

  // Customer Settings states
  const [phoneSettings, setPhoneSettings] = useState({
    optionalSettings: true,
    contactsDublicate: false,
    multuipleContacts: true,
  });
  const [customerCategories, setCustomerCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // Sync state with loaded companyDetails from database
  useEffect(() => {
    if (companyDetails) {
      setBrandName(companyDetails.brandName || "");
      setCompanyPhone(companyDetails.phoneNumber ? String(companyDetails.phoneNumber) : "");
      setLogoUrl(companyDetails.logo || "");
      setEmailAddress(companyDetails.email || "");
      setWebsite(companyDetails.website || "");

      // Billing settings
      const billing = companyDetails.billingSetting?.billingDetails;
      setBillingName(billing?.companyName || companyDetails.brandName || "");
      setGstNumber(billing?.gstNumber || "");
      setAddress(billing?.address || "");

      // Visit settings
      const visits = companyDetails.visitSetting?.visitSetting;
      setVisitPurposes(visits?.visitPurpose || []);
      setFeedbackTypes(visits?.feedbackTypes || []);
      setTaskTypes(visits?.taskType || []);

      // Customer settings
      const cust = companyDetails.customerSetting?.customerSettings;
      if (cust?.phoneNumberSettings) {
        setPhoneSettings({
          optionalSettings: !!cust.phoneNumberSettings.optionalSettings,
          contactsDublicate: !!cust.phoneNumberSettings.contactsDublicate,
          multuipleContacts: !!cust.phoneNumberSettings.multuipleContacts,
        });
      }
      setCustomerCategories(cust?.categories || []);
    }
  }, [companyDetails]);

  // Visit list addition handlers
  const handleAddPurpose = (e) => {
    e.preventDefault();
    if (!newPurpose.trim()) return;
    setVisitPurposes([
      ...visitPurposes,
      { id: Date.now().toString(), purpose: newPurpose.trim() },
    ]);
    setNewPurpose("");
  };

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;
    setFeedbackTypes([
      ...feedbackTypes,
      { id: Date.now().toString(), type: newFeedback.trim() },
    ]);
    setNewFeedback("");
  };

  const handleAddTaskType = (e) => {
    e.preventDefault();
    if (!newTaskType.trim()) return;
    setTaskTypes([
      ...taskTypes,
      { id: Date.now().toString(), type: newTaskType.trim() },
    ]);
    setNewTaskType("");
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setCustomerCategories([
      ...customerCategories,
      { id: Date.now().toString(), category: newCategory.trim() },
    ]);
    setNewCategory("");
  };

  const rolesList = [
    {
      name: "Admin",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      description: "Full administrative control over organization, billing, and system settings.",
      permissions: ["Manage All Users", "Configure System Settings", "Billing Access", "View Reports"],
    },
    {
      name: "Manager",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      description: "Oversees team operations, approves visits, leaves, and reviews field reports.",
      permissions: ["Approve Visits & Leaves", "Assign Tasks", "View Team Reports", "Manage Customers"],
    },
    {
      name: "Head technician",
      color: "bg-amber-100 text-amber-800 border-amber-200",
      description: "Leads technical installations, handles escalation calls, and inspects sites.",
      permissions: ["Execute Technical Tasks", "Inspect Installations", "Submit Service Reports"],
    },
    {
      name: "technician",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description: "Field service execution, routine maintenance checks, and client visits.",
      permissions: ["Punch Attendance", "Complete Assigned Visits", "Submit Feedback"],
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-8 h-8 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500">Loading settings data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fadeIn">
      {/* Sub-tabs Navigation Bar */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 space-y-6 flex-shrink-0">
        <div>
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            General / Profile
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setActiveSettingsTab("My profile")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "My profile"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              My profile
            </button>
            <button
              onClick={() => setActiveSettingsTab("Company Profile")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Company Profile"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Company Profile
            </button>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            GEO Settings
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setActiveSettingsTab("Visit settings")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Visit settings"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Visit settings
            </button>
            <button
              onClick={() => setActiveSettingsTab("task settings")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "task settings"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Task settings
            </button>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            CRM Settings
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setActiveSettingsTab("Lead settings")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Lead settings"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Lead settings
            </button>
            <button
              onClick={() => setActiveSettingsTab("Customer Settings")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Customer Settings"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Customer Settings
            </button>
            <button
              onClick={() => setActiveSettingsTab("sales settings")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "sales settings"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Sales settings
            </button>
            <button
              onClick={() => setActiveSettingsTab("templates")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "templates"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Templates
            </button>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            HRM & Team
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setActiveSettingsTab("Attendance settings")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Attendance settings"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Attendance settings
            </button>
            <button
              onClick={() => setActiveSettingsTab("Leave settings")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Leave settings"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Leave settings
            </button>
            <button
              onClick={() => setActiveSettingsTab("Expense settings")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Expense settings"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Expense settings
            </button>
            <button
              onClick={() => setActiveSettingsTab("Form builder")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Form builder"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Form builder
            </button>
            <button
              onClick={() => setActiveSettingsTab("Users")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Users"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveSettingsTab("Roles")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeSettingsTab === "Roles"
                  ? "bg-purple-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              Roles
            </button>
          </div>
        </div>
      </div>

      {/* Sub-tab Content Area */}
      <div className="flex-1 p-6 lg:p-8">
        {/* COMPANY PROFILE */}
        {activeSettingsTab === "Company Profile" && (
          <div className="space-y-6 max-w-3xl animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Company Profile & Billing</h2>
              <p className="text-xs text-slate-500 mt-1">
                Manage core brand identity and billing information linked to your organization ID.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Phone</label>
                <input
                  type="text"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Logo URL</label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-purple-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Billing Details (Linked BillingSettings Model)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GST Number</label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-purple-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Address</label>
                  <textarea
                    rows="2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-purple-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-purple-600 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md hover:bg-purple-700 transition-colors">
                Save Company Changes
              </button>
            </div>
          </div>
        )}

        {/* MY PROFILE */}
        {activeSettingsTab === "My profile" && (
          <div className="space-y-6 max-w-2xl animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-slate-900">My Personal Profile</h2>
              <p className="text-xs text-slate-500 mt-1">Update your personal account credentials and details.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xl shadow overflow-hidden">
                {user?.photo ? (
                  <img src={user.photo} alt="user" className="w-full h-full object-cover" />
                ) : (
                  `${user?.firstname?.charAt(0) || ""}${user?.lastname?.charAt(0) || ""}`
                )}
              </div>
              <div>
                <button className="bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700">
                  Change Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  readOnly
                  value={user?.firstname || ""}
                  className="w-full h-10 px-3 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg text-xs outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  readOnly
                  value={user?.lastname || ""}
                  className="w-full h-10 px-3 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg text-xs outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  readOnly
                  value={user?.email || ""}
                  className="w-full h-10 px-3 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg text-xs outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                <input
                  type="text"
                  disabled
                  value={user?.role || ""}
                  className="w-full h-10 px-3 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg text-xs outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        )}

        {/* VISIT SETTINGS */}
        {activeSettingsTab === "Visit settings" && (
          <div className="space-y-8 max-w-4xl animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Visit Settings (Linked VisitSettings Model)</h2>
              <p className="text-xs text-slate-500 mt-1">
                Configure visit purposes, feedback types, and task classifications.
              </p>
            </div>

            {/* Visit Purpose Section */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Visit Purposes (`visitPurpose`)</h3>
              <form onSubmit={handleAddPurpose} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new purpose..."
                  value={newPurpose}
                  onChange={(e) => setNewPurpose(e.target.value)}
                  className="flex-1 h-9 px-3 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-600"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-700"
                >
                  Add
                </button>
              </form>
              <div className="space-y-2">
                {visitPurposes.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  >
                    <span className="font-medium text-slate-700">{item.purpose}</span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Types Section */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Feedback Types (`feedbackTypes`)</h3>
              <form onSubmit={handleAddFeedback} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new feedback type..."
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  className="flex-1 h-9 px-3 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-600"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-700"
                >
                  Add
                </button>
              </form>
              <div className="space-y-2">
                {feedbackTypes.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  >
                    <span className="font-medium text-slate-700">{item.type}</span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Types Section */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Task Types (`taskType`)</h3>
              <form onSubmit={handleAddTaskType} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new task type..."
                  value={newTaskType}
                  onChange={(e) => setNewTaskType(e.target.value)}
                  className="flex-1 h-9 px-3 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-600"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-700"
                >
                  Add
                </button>
              </form>
              <div className="space-y-2">
                {taskTypes.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  >
                    <span className="font-medium text-slate-700">{item.type}</span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CUSTOMER SETTINGS */}
        {activeSettingsTab === "Customer Settings" && (
          <div className="space-y-8 max-w-3xl animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Customer Settings (Linked CustomerSettings Model)</h2>
              <p className="text-xs text-slate-500 mt-1">Configure customer contact rules and category groupings.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-800 mb-2">Phone Number Settings (`phoneNumberSettings`)</h3>
              <label className="flex items-center gap-3 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={phoneSettings.optionalSettings}
                  onChange={(e) =>
                    setPhoneSettings({
                      ...phoneSettings,
                      optionalSettings: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span>Enable Optional Phone Settings (`optionalSettings`)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={phoneSettings.contactsDublicate}
                  onChange={(e) =>
                    setPhoneSettings({
                      ...phoneSettings,
                      contactsDublicate: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span>Allow Duplicate Contacts (`contactsDublicate`)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={phoneSettings.multuipleContacts}
                  onChange={(e) =>
                    setPhoneSettings({
                      ...phoneSettings,
                      multuipleContacts: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span>Support Multiple Contacts Per Client (`multuipleContacts`)</span>
              </label>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Customer Categories (`categories`)</h3>
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add category name..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 h-9 px-3 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-600"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-700"
                >
                  Add
                </button>
              </form>
              <div className="space-y-2">
                {customerCategories.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  >
                    <span className="font-medium text-slate-700">{item.category}</span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROLES */}
        {activeSettingsTab === "Roles" && (
          <div className="space-y-6 max-w-4xl animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-slate-900">System Roles (4 Roles Configured)</h2>
              <p className="text-xs text-slate-500 mt-1">
                Review permissions and access levels across technical and managerial tiers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rolesList.map((role) => (
                <div
                  key={role.name}
                  className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">{role.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${role.color}`}>
                      Role
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{role.description}</p>
                  <div className="pt-2">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Permissions:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {role.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md"
                        >
                          ✓ {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER SUB-TABS */}
        {![
          "Company Profile",
          "My profile",
          "Visit settings",
          "Customer Settings",
          "Roles",
        ].includes(activeSettingsTab) && (
          <div className="py-16 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 text-base">{activeSettingsTab} Configuration</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Static panel for <span className="font-semibold">{activeSettingsTab}</span>. Settings module ready for backend connection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
