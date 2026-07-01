"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import services from "../features/index";
import { clearAuthError } from "../redux/Slices/authSlice";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Form states
  const [photo, setPhoto] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [additionalNumber, setAdditionalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const [reportingHead, setReportingHead] = useState("");
  const [locationTracking, setLocationTracking] = useState(false);
  const [active, setActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Verification & Success/Validation states
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Redux Selector
  const { loading, error: reduxError } = useSelector((state) => state.auth);

  // Clear existing errors and simulate captcha
  useEffect(() => {
    dispatch(clearAuthError());

    const timer = setTimeout(() => {
      setCaptchaLoaded(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    dispatch(clearAuthError());

    // Client-side validations
    if (!firstname.trim()) {
      setValidationError("First name is required.");
      return;
    }
    if (!lastname.trim()) {
      setValidationError("Last name is required.");
      return;
    }
    if (!email) {
      setValidationError("Email is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (!mobileNumber) {
      setValidationError("Mobile number is required.");
      return;
    }
    const digitRegex = /^\d+$/;
    if (!digitRegex.test(mobileNumber)) {
      setValidationError("Mobile number must contain only numbers.");
      return;
    }
    if (!additionalNumber) {
      setValidationError("Additional number is required.");
      return;
    }
    if (!digitRegex.test(additionalNumber)) {
      setValidationError("Additional number must contain only numbers.");
      return;
    }
    if (!password) {
      setValidationError("Password is required.");
      return;
    }
    if (!digitRegex.test(password)) {
      setValidationError("Password must contain only numbers (digits) due to API requirements.");
      return;
    }

    const payload = {
      photo: photo.trim(),
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email,
      password: Number(password),
      mobileNumber: Number(mobileNumber),
      additionalNumber: Number(additionalNumber),
      role,
      reportingHead: reportingHead.trim() || null,
      locationTracking: Boolean(locationTracking),
      active: Boolean(active),
      tasks: [],
    };

    try {
      await dispatch(services.registerUser(payload)).unwrap();
      setRegisterSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 text-slate-800 py-10 px-5 font-sans">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 w-full max-w-[480px] p-8 md:p-10 text-left animate-fadeIn">
        
        {/* Stylized Purple 'R' Logo */}
        <div className="mx-auto mb-4 flex justify-center items-center">
          <svg width="42" height="42" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8H23C27.9706 8 32 12.0294 32 17C32 21.9706 27.9706 26 23 26H18V32H12V8ZM18 14V20H23C24.6569 20 26 18.6569 26 17C26 15.3431 24.6569 14 23 14H18Z" fill="#7e3af2"/>
            <path d="M22.5 24.5L29 32H36L28.5 24.5H22.5Z" fill="#7e3af2"/>
          </svg>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 text-center m-0 mb-7">Register Staff</h1>

        <form onSubmit={handleSubmit} noValidate>
          {/* Success Notification */}
          {registerSuccess && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-5 flex items-start gap-2.5 text-green-800 text-sm leading-relaxed">
              <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Staff registered successfully! Redirecting to login...</span>
            </div>
          )}

          {/* Error notifications */}
          {(validationError || reduxError) && !registerSuccess && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-5 flex items-start gap-2.5 text-red-800 text-sm leading-relaxed">
              <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{validationError || reduxError}</span>
            </div>
          )}

          {/* Photo URL */}
          <div className="mb-4 flex flex-col">
            <label htmlFor="photo" className="text-xs font-semibold text-slate-600 mb-1.5">Photo URL / Path (Optional)</label>
            <input
              id="photo"
              type="text"
              className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-slate-400"
              placeholder="e.g. /photos/john.jpg (optional)"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              disabled={!captchaLoaded || loading || registerSuccess}
            />
          </div>

          {/* Name Fields (Grid) */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label htmlFor="firstname" className="text-xs font-semibold text-slate-600 mb-1.5">First Name</label>
              <input
                id="firstname"
                type="text"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-slate-400"
                placeholder="John"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                disabled={!captchaLoaded || loading || registerSuccess}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname" className="text-xs font-semibold text-slate-600 mb-1.5">Last Name</label>
              <input
                id="lastname"
                type="text"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-slate-400"
                placeholder="Doe"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                disabled={!captchaLoaded || loading || registerSuccess}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="text-xs font-semibold text-slate-600 mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-slate-400"
              placeholder="john.doe@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!captchaLoaded || loading || registerSuccess}
            />
          </div>

          {/* Phone Numbers (Grid) */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label htmlFor="mobileNumber" className="text-xs font-semibold text-slate-600 mb-1.5">Mobile Number</label>
              <input
                id="mobileNumber"
                type="tel"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-digits"
                placeholder="9876543210"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                disabled={!captchaLoaded || loading || registerSuccess}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="additionalNumber" className="text-xs font-semibold text-slate-600 mb-1.5">Additional Number</label>
              <input
                id="additionalNumber"
                type="tel"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-digits"
                placeholder="9876543211"
                value={additionalNumber}
                onChange={(e) => setAdditionalNumber(e.target.value.replace(/\D/g, ""))}
                disabled={!captchaLoaded || loading || registerSuccess}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="text-xs font-semibold text-slate-600 mb-1.5">Password (digits only)</label>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl pl-4 pr-11 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-slate-400"
                placeholder="Enter password digits"
                value={password}
                onChange={(e) => setPassword(e.target.value.replace(/\D/g, ""))}
                disabled={!captchaLoaded || loading || registerSuccess}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-slate-400 flex items-center justify-center p-1.5 rounded-lg transition-colors hover:text-slate-500 hover:bg-slate-50"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={registerSuccess}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Role & Reporting Head (Grid) */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label htmlFor="role" className="text-xs font-semibold text-slate-600 mb-1.5">Role</label>
              <select
                id="role"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!captchaLoaded || loading || registerSuccess}
                style={{ appearance: "auto" }}
              >
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="reportingHead" className="text-xs font-semibold text-slate-600 mb-1.5">Reporting Head ID</label>
              <input
                id="reportingHead"
                type="text"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-slate-400"
                placeholder="Optional mongo ID"
                value={reportingHead}
                onChange={(e) => setReportingHead(e.target.value)}
                disabled={!captchaLoaded || loading || registerSuccess}
              />
            </div>
          </div>

          {/* Checkboxes (Grid) */}
          <div className="grid grid-cols-2 gap-4 mb-5 mt-2">
            <div className="flex items-center gap-2.5">
              <input
                id="locationTracking"
                type="checkbox"
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                checked={locationTracking}
                onChange={(e) => setLocationTracking(e.target.checked)}
                disabled={!captchaLoaded || loading || registerSuccess}
              />
              <label htmlFor="locationTracking" className="text-xs font-semibold text-slate-600 cursor-pointer select-none">
                Location Tracking
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <input
                id="active"
                type="checkbox"
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                disabled={!captchaLoaded || loading || registerSuccess}
              />
              <label htmlFor="active" className="text-xs font-semibold text-slate-600 cursor-pointer select-none">
                Active Staff
              </label>
            </div>
          </div>

          {/* Captcha State / Register Button */}
          {!captchaLoaded ? (
            <button type="button" className="w-full h-12 bg-purple-300 text-white border-none rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2.5 transition-all mt-3 cursor-not-allowed opacity-90" disabled>
              <div className="w-[18px] h-[18px] border-2 border-white/35 border-t-white rounded-full animate-spin"></div>
              <span>Loading captcha...</span>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full h-12 bg-[#9061f9] hover:bg-[#7e3af2] active:scale-[0.985] disabled:bg-purple-300 disabled:cursor-not-allowed text-white border-none rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2.5 transition-all mt-3"
              disabled={loading || registerSuccess}
            >
              {loading ? (
                <>
                  <div className="w-[18px] h-[18px] border-2 border-white/35 border-t-white rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          )}
        </form>

        <div className="text-center text-sm text-slate-500 mt-6">
          Already have an account?
          <button
            type="button"
            className="font-semibold text-purple-600 bg-none border-none p-0 cursor-pointer hover:underline ml-1"
            onClick={() => router.push("/login")}
            disabled={registerSuccess}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
