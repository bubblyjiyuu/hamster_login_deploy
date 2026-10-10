import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, UserPlus, LogOut } from 'lucide-react';
import CustomInput from './CustomInput';

export default function LoginForm({
  onFocus,
  onBlur,
  showPassword,
  setShowPassword,
  isSubmitting,
  loginStatus,
  errorMessage,
  successMessage,
  isSignUp,
  onSwitchMode,
  onSignUp,
  onSignIn,
  currentUser,
  onLogout
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    if (isSignUp) {
      onSignUp(email, password);
    } else {
      onSignIn(email, password);
    }
  };

  if (currentUser) {
    return (
      <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white">
        <div className="w-full max-w-xs sm:max-w-sm mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#4a4252] tracking-tight">
            Welcome!
          </h2>
          <p className="text-[#8e8296] text-xs sm:text-sm mt-3">
            You are signed in as
          </p>
          <p className="mt-2 text-sm font-semibold text-[#4a4252] break-all">
            {currentUser.email}
          </p>
          <button
            type="button"
            onClick={onLogout}
            className="w-full mt-8 py-3.5 px-4 bg-[#e8b4b8] hover:bg-[#e09fa4] text-white font-medium rounded-full shadow-sm hover:shadow-md focus:ring-4 focus:ring-[#f5d5d8] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Log Out</span>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white">
      <div className="w-full max-w-xs sm:max-w-sm mx-auto">
        <div className="flex bg-[#f8f5f1] p-1 rounded-full mb-6">
          <button
            type="button"
            onClick={() => onSwitchMode(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
              isSignUp ? 'bg-white text-[#4a4252] shadow-sm' : 'text-[#8e8296]'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
              !isSignUp ? 'bg-white text-[#4a4252] shadow-sm' : 'text-[#8e8296]'
            }`}
          >
            Sign In
          </button>
        </div>

        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#4a4252] tracking-tight">
            {isSignUp ? 'Create Account' : 'Sweet Return'}
          </h2>
          <p className="text-[#8e8296] text-xs sm:text-sm mt-1.5">
            {isSignUp
              ? 'Register your account to feed Campbell!'
              : 'Log in to see what Campbell has prepared for you.'}
          </p>
        </div>

        {loginStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-xs text-center font-medium">
            {errorMessage}
          </div>
        )}

        {loginStatus === 'success' && successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-xs text-center font-medium">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => onFocus('email')}
            onBlur={onBlur}
            placeholder="your_email@domain.com"
            icon={Mail}
          />

          <CustomInput
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => onFocus('password')}
            onBlur={onBlur}
            placeholder="••••••••"
            icon={Lock}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-[#b1a7b8] hover:text-[#73687c] transition-colors rounded-full"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            }
          />

          {!isSignUp && (
            <div className="flex items-center justify-between text-xs pt-1 px-1">
              <label className="flex items-center text-[#8e8296] cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-0 bg-[#f8f5f1] text-[#e3b5be] focus:ring-0 accent-[#e3b5be]"
                />
                <span className="ml-2 whitespace-nowrap">Remember me</span>
              </label>
              <a href="#forgot" className="text-[#c18c96] hover:underline font-medium whitespace-nowrap ml-2">
                Forgot?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 py-3.5 px-4 bg-[#e8b4b8] hover:bg-[#e09fa4] text-white font-medium rounded-full shadow-sm hover:shadow-md focus:ring-4 focus:ring-[#f5d5d8] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? 'Register Now' : 'Sign In'}</span>
                {isSignUp ? <UserPlus size={16} /> : <Sparkles size={16} />}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
