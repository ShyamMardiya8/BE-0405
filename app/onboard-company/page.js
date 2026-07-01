"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import services from "../features/index";

export default function OnboardCompanyPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  // Step 1: Company Fields
  const [brandName, setBrandName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [logo, setLogo] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // Step 2: Super Admin Fields
  const [adminPhoto, setAdminPhoto] = useState("");
  const [adminFirstname, setAdminFirstname] = useState("");
  const [adminLastname, setAdminLastname] = useState("");
  const [adminMobileNumber, setAdminMobileNumber] = useState("");
  const [adminAdditionalNumber, setAdminAdditionalNumber] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status & Validation states
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCaptchaLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNextStep = (e) => {
    e.preventDefault();
    setValidationError("");

    if (!brandName.trim()) {
      setValidationError("Company Brand Name is required.");
      return;
    }
    if (!phoneNumber) {
      setValidationError("Company Phone Number is required.");
      return;
    }
    if (!/^\d+$/.test(phoneNumber)) {
      setValidationError("Company Phone Number must contain digits only.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("Valid Company Email is required.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    if (!adminFirstname.trim()) {
      setValidationError("Admin First Name is required.");
      return;
    }
    if (!adminLastname.trim()) {
      setValidationError("Admin Last Name is required.");
      return;
    }
    if (!adminMobileNumber || !/^\d+$/.test(adminMobileNumber)) {
      setValidationError("Valid Admin Mobile Number (digits only) is required.");
      return;
    }
    if (!adminAdditionalNumber || !/^\d+$/.test(adminAdditionalNumber)) {
      setValidationError("Valid Admin Additional Number (digits only) is required.");
      return;
    }
    if (!adminEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
      setValidationError("Valid Admin Email is required.");
      return;
    }
    if (!adminPassword || !/^\d+$/.test(adminPassword)) {
      setValidationError("Admin Password must contain digits only.");
      return;
    }

    const payload = {
      brandName: brandName.trim(),
      phoneNumber: Number(phoneNumber),
      logo: logo.trim(),
      email: email.trim(),
      website: website.trim(),

      adminPhoto: adminPhoto.trim(),
      adminFirstname: adminFirstname.trim(),
      adminLastname: adminLastname.trim(),
      adminMobileNumber: Number(adminMobileNumber),
      adminAdditionalNumber: Number(adminAdditionalNumber),
      adminEmail: adminEmail.trim(),
      adminPassword: Number(adminPassword),
    };

    setLoading(true);
    try {
      await dispatch(services.onboardCompany(payload)).unwrap();
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err) {
      console.error("Onboarding error:", err);
      setValidationError(typeof err === "string" ? err : err.message || "Failed to onboard company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 text-slate-800 py-12 px-5 font-sans">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 w-full max-w-[540px] p-8 md:p-10 text-left">
        
        {/* Logo Bar */}
        <div className="mx-auto mb-4 flex justify-center items-center">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-purple-600/30">
            U
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 text-center m-0 mb-2">Onboard New Company</h1>
        <p className="text-xs text-slate-500 text-center mb-8">Set up organization tenant details & Super Admin account</p>

        {/* Stepper indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 text-xs font-bold ${step === 1 ? "text-purple-600" : "text-slate-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-600"}`}>1</span>
            Company Info
          </div>
          <div className="w-10 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-2 text-xs font-bold ${step === 2 ? "text-purple-600" : "text-slate-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-600"}`}>2</span>
            Super Admin Setup
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 flex items-start gap-3 text-green-800 text-sm leading-relaxed">
            <svg className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Company onboarded successfully with Super Admin! Redirecting to login...</span>
          </div>
        )}

        {validationError && !success && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-start gap-3 text-red-800 text-sm leading-relaxed">
            <svg className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{validationError}</span>
          </div>
        )}

        {/* STEP 1 FORM */}
        {step === 1 && (
          <form onSubmit={handleNextStep} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company Brand Name</label>
              <input
                type="text"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                placeholder="e.g. Jasani Elevator"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                disabled={!captchaLoaded}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company Phone</label>
                <input
                  type="tel"
                  className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  disabled={!captchaLoaded}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Logo URL (Optional)</label>
                <input
                  type="text"
                  className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                  placeholder="/logos/brand.png (optional)"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  disabled={!captchaLoaded}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company Email</label>
              <input
                type="email"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                placeholder="info@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!captchaLoaded}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company Website (Optional)</label>
              <input
                type="text"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                placeholder="https://company.com (optional)"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                disabled={!captchaLoaded}
              />
            </div>

            {!captchaLoaded ? (
              <button type="button" className="w-full h-12 bg-purple-300 text-white border-none rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-4 cursor-not-allowed" disabled>
                <div className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin"></div>
                <span>Loading captcha...</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 active:scale-[0.985] text-white border-none rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-4 transition-all"
              >
                <span>Next: Create Super Admin</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            )}
          </form>
        )}

        {/* STEP 2 FORM */}
        {step === 2 && (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Admin Photo URL (Optional)</label>
              <input
                type="text"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                placeholder="/photos/admin.jpg (optional)"
                value={adminPhoto}
                onChange={(e) => setAdminPhoto(e.target.value)}
                disabled={loading || success}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">First Name</label>
                <input
                  type="text"
                  className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                  placeholder="Narayan"
                  value={adminFirstname}
                  onChange={(e) => setAdminFirstname(e.target.value)}
                  disabled={loading || success}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Last Name</label>
                <input
                  type="text"
                  className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                  placeholder="Vadaria"
                  value={adminLastname}
                  onChange={(e) => setAdminLastname(e.target.value)}
                  disabled={loading || success}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mobile Number</label>
                <input
                  type="tel"
                  className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                  placeholder="9876543210"
                  value={adminMobileNumber}
                  onChange={(e) => setAdminMobileNumber(e.target.value.replace(/\D/g, ""))}
                  disabled={loading || success}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Additional Number</label>
                <input
                  type="tel"
                  className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                  placeholder="9876543211"
                  value={adminAdditionalNumber}
                  onChange={(e) => setAdminAdditionalNumber(e.target.value.replace(/\D/g, ""))}
                  disabled={loading || success}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Admin Email (Login Username)</label>
              <input
                type="email"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                placeholder="narayan@jasanielevator.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                disabled={loading || success}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Admin Password (digits only)</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl pl-4 pr-11 py-2.5 text-sm outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                  placeholder="Password digits"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value.replace(/\D/g, ""))}
                  disabled={loading || success}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1 rounded hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-sm font-semibold transition-all"
                disabled={loading || success}
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 h-12 bg-purple-600 hover:bg-purple-700 active:scale-[0.985] disabled:bg-purple-300 text-white border-none rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                disabled={loading || success}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin"></div>
                    <span>Onboarding...</span>
                  </>
                ) : (
                  <span>Complete Onboarding</span>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="text-center text-xs text-slate-400 mt-8">
          Need to access existing account?{" "}
          <button onClick={() => router.push("/login")} className="text-purple-600 font-semibold hover:underline">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
