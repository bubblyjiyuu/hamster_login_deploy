import React from 'react';
import HamsterCharacter from './HamsterCharacter';

export default function HamsterCanvas({
  mousePos,
  focusedField,
  showPassword,
  loginStatus,
  currentUser,
  isSleeping,
  onToggleSleep
}) {
  const getSpeechBubbleText = () => {
    if (isSleeping) return 'Zzz... Click Campbell to wake up! 🌙';
    if (loginStatus === 'success' && currentUser) return 'Yay! Welcome back~ ✨';
    if (loginStatus === 'success') return 'Account ready! Please Sign In~ 🌸';
    if (loginStatus === 'error') return 'Oops! Let us try again 🌸';
    if (focusedField === 'email') return 'I am watching you type~ 🍃';
    if (focusedField === 'password') {
      return showPassword ? 'I will keep your secret! 🤫' : "No peeking, I promise! 🙈";
    }
    return 'Click me anytime to put me to sleep! 🐾';
  };

  return (
    <div
      className={`w-full ${
        isSleeping ? 'lg:w-full min-h-[480px]' : 'lg:w-1/2 min-h-[340px]'
      } p-8 sm:p-10 flex flex-col items-center justify-center relative transition-all duration-700 ease-in-out ${
        isSleeping ? 'bg-[#1e1e2e]' : 'bg-[#eaf2ef]'
      }`}
    >
      {/* Element Bintang Malam saat Tidur */}
      {isSleeping && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-indigo-200 animate-pulse" />
          <div className="absolute top-20 right-16 w-3 h-3 rounded-full bg-purple-200 animate-ping" />
          <div className="absolute bottom-12 left-20 w-2 h-2 rounded-full bg-pink-200" />
        </div>
      )}

      {/* Floating Speech Bubble */}
      <div
        className={`mb-6 px-6 py-2.5 rounded-full shadow-sm font-medium text-xs sm:text-sm tracking-wide text-center transition-all duration-300 transform hover:scale-105 ${
          isSleeping
            ? 'bg-slate-800/80 text-purple-200 border border-slate-700'
            : 'bg-white/80 backdrop-blur-sm text-[#5a6b63]'
        }`}
      >
        {getSpeechBubbleText()}
      </div>

      {/* Hamster SVG */}
      <HamsterCharacter
        mousePos={mousePos}
        focusedField={focusedField}
        showPassword={showPassword}
        isSleeping={isSleeping}
        onToggleSleep={onToggleSleep}
      />
    </div>
  );
}