"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import services from "../features/index";
import { clearAuthError } from "../redux/Slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Verification & Validation states
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Redux Auth Selector
  const { loading, error: reduxError, user } = useSelector((state) => state.auth);

  // Clear existing authentication errors on mount
  useEffect(() => {
    dispatch(clearAuthError());

    // Simulate captcha loading (1.5 seconds)
    const timer = setTimeout(() => {
      setCaptchaLoaded(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    dispatch(clearAuthError());

    // Client-side validations
    if (!email) {
      setValidationError("Email is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setValidationError("Password is required.");
      return;
    }

    // Trigger Redux login action
    try {
      await dispatch(services.loginUser({ email, password })).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 text-slate-800 p-5 font-sans">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 w-full max-w-[440px] p-10 text-left">
        
        {/* Stylized Purple 'R' Logo */}
        <div className="mx-auto mb-4 flex justify-center items-center">
          <svg width="42" height="42" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8H23C27.9706 8 32 12.0294 32 17C32 21.9706 27.9706 26 23 26H18V32H12V8ZM18 14V20H23C24.6569 20 26 18.6569 26 17C26 15.3431 24.6569 14 23 14H18Z" fill="#7e3af2"/>
            <path d="M22.5 24.5L29 32H36L28.5 24.5H22.5Z" fill="#7e3af2"/>
          </svg>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 text-center m-0 mb-7">Log In</h1>

        <form onSubmit={handleSubmit} noValidate>
          {/* Error alerts */}
          {(validationError || reduxError) && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-5 flex items-start gap-2.5 text-red-800 text-sm leading-relaxed">
              <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{validationError || reduxError}</span>
            </div>
          )}

          {/* Email Field */}
          <div className="mb-5 flex flex-col">
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-600">Email</label>
            </div>
            <div className="relative w-full">
              <input
                id="email"
                type="email"
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-slate-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!captchaLoaded || loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-5 flex flex-col">
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-600">Password</label>
              <button
                type="button"
                className="text-[11px] font-semibold text-purple-600 bg-none border-none p-0 cursor-pointer hover:underline"
                onClick={() => alert("Forgot Password feature is coming soon!")}
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full h-[46px] bg-white border border-gray-200 focus:border-purple-500 rounded-xl pl-4 pr-11 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-4 focus:ring-purple-500/10 placeholder-slate-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!captchaLoaded || loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-slate-400 flex items-center justify-center p-1.5 rounded-lg transition-colors hover:text-slate-500 hover:bg-slate-50"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
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

          {/* Captcha State / Login Button */}
          {!captchaLoaded ? (
            <button type="button" className="w-full h-12 bg-purple-300 text-white border-none rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2.5 transition-all mt-2 cursor-not-allowed opacity-90" disabled>
              <div className="w-[18px] h-[18px] border-2 border-white/35 border-t-white rounded-full animate-spin"></div>
              <span>Loading captcha...</span>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full h-12 bg-[#9061f9] hover:bg-[#7e3af2] active:scale-[0.985] disabled:bg-purple-300 disabled:cursor-not-allowed text-white border-none rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2.5 transition-all mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-[18px] h-[18px] border-2 border-white/35 border-t-white rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Log In</span>
              )}
            </button>
          )}
        </form>

        <div className="text-center text-sm text-slate-500 mt-6">
          If not account,
          <button
            type="button"
            className="font-semibold text-purple-600 bg-none border-none p-0 cursor-pointer hover:underline ml-1"
            onClick={() => router.push("/register")}
          >
            register now
          </button>
        </div>
      </div>
    </div>
  );
}
