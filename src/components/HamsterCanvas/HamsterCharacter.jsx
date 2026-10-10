import React from 'react';
import { motion } from 'framer-motion';
import EyeTracker from './EyeTracker';

export default function HamsterCharacter({
  mousePos,
  focusedField,
  showPassword,
  isSleeping,
  onToggleSleep
}) {
  // Logika tutup mata: Jika fokus di password DAN password tersembunyi (showPassword === false)
  const isCoveringEyes = focusedField === 'password' && !showPassword;
  const isPeeking = focusedField === 'password' && showPassword;

  return (
    <div
      onClick={onToggleSleep}
      className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center cursor-pointer group select-none"
    >
      {/* Visual Indikator Hover */}
      <div className="absolute inset-0 rounded-full group-hover:scale-105 transition-transform duration-300" />

      {/* Floating Zzz Animation saat Tidur */}
      {isSleeping && (
        <div className="absolute top-2 right-8 pointer-events-none z-10">
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], y: -25, x: 15, scale: 1.2 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeOut' }}
            className="absolute text-purple-300 font-bold text-xl"
          >
            z
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], y: -35, x: 25, scale: 1.4 }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.8, ease: 'easeOut' }}
            className="absolute text-indigo-200 font-bold text-2xl"
          >
            Z
          </motion.span>
        </div>
      )}

      <svg viewBox="0 0 200 220" className="w-full h-full overflow-visible">
        {/* Soft Shadow */}
        <ellipse
          cx="100"
          cy="202"
          rx="55"
          ry="8"
          fill={isSleeping ? '#12121a' : '#e2d9d5'}
          opacity={isSleeping ? '0.5' : '0.6'}
        />

        {/* Ears */}
        <g id="ears">
          <ellipse cx="48" cy="58" rx="15" ry="18" fill="#d8c2b0" transform="rotate(-15 48 58)" />
          <ellipse cx="48" cy="58" rx="9" ry="12" fill="#f5d5d8" transform="rotate(-15 48 58)" />
          <ellipse cx="152" cy="58" rx="15" ry="18" fill="#d8c2b0" transform="rotate(15 152 58)" />
          <ellipse cx="152" cy="58" rx="9" ry="12" fill="#f5d5d8" transform="rotate(15 152 58)" />
        </g>

        {/* Body & Head */}
        <g id="body">
          <path
            d="M 42,110 C 32,150 48,198 100,198 C 152,198 168,150 158,110 C 158,60 138,48 100,48 C 62,48 42,60 42,110 Z"
            fill="#eadace"
          />
          <path
            d="M 52,120 C 48,158 62,193 100,193 C 138,193 152,158 148,120 C 144,98 128,88 100,88 C 72,88 56,98 52,120 Z"
            fill="#fffcf9"
          />
          {/* Subtle Dorsal Stripe */}
          <path
            d="M 100,48 C 99,65 99,82 100,100"
            stroke="#bfaaa0"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Eyes / Sleeping Status */}
        {isSleeping ? (
          <g id="sleeping-eyes" stroke="#6b6175" strokeWidth="2.5" strokeLinecap="round">
            <path d="M 65,98 Q 72,103 79,98" fill="none" />
            <path d="M 121,98 Q 128,103 135,98" fill="none" />
          </g>
        ) : !isCoveringEyes ? (
          <g id="eyes">
            <EyeTracker mousePos={mousePos} focusedField={focusedField} cx={72} cy={96} />
            <EyeTracker mousePos={mousePos} focusedField={focusedField} cx={128} cy={96} />
          </g>
        ) : (
          <g id="closed-eyes" stroke="#6b6175" strokeWidth="2.5" strokeLinecap="round">
            <path d="M 66,97 Q 72,92 78,97" fill="none" />
            <path d="M 122,97 Q 128,92 134,97" fill="none" />
          </g>
        )}

        {/* Cheeks */}
        <ellipse cx="58" cy="108" rx="9" ry="5.5" fill="#f7cad0" opacity={isSleeping ? '0.4' : '0.65'} />
        <ellipse cx="142" cy="108" rx="9" ry="5.5" fill="#f7cad0" opacity={isSleeping ? '0.4' : '0.65'} />

        {/* Nose & Whiskers */}
        <g id="snout">
          <ellipse cx="100" cy="107" rx="3.5" ry="2.5" fill="#f2b5bd" />
          <path
            d="M 100,109.5 L 100,113 Q 96,116 92,115 M 100,113 Q 104,116 108,115"
            stroke="#7d7285"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M 48,110 L 32,107 M 48,114 L 30,114 M 48,118 L 34,121" stroke="#caa293" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
          <path d="M 152,110 L 168,107 M 152,114 L 170,114 M 152,118 L 166,121" stroke="#caa293" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
        </g>

        {/* Tangan Pink (Tanpa Outline) */}
        <motion.g
          animate={
            isSleeping
              ? { x: 5, y: 5, rotate: 5 }
              : isCoveringEyes
              ? { x: 22, y: -22, rotate: 18 }
              : isPeeking
              ? { x: 12, y: -10, rotate: 8 }
              : { x: 0, y: 0, rotate: 0 }
          }
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          <ellipse cx="65" cy="144" rx="11" ry="9" fill="#f5d5d8" />
        </motion.g>

        <motion.g
          animate={
            isSleeping
              ? { x: -5, y: 5, rotate: -5 }
              : isCoveringEyes
              ? { x: -22, y: -22, rotate: -18 }
              : isPeeking
              ? { x: -12, y: -10, rotate: -8 }
              : { x: 0, y: 0, rotate: 0 }
          }
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          <ellipse cx="135" cy="144" rx="11" ry="9" fill="#f5d5d8" />
        </motion.g>

        {/* Kaki Pink (Tanpa Outline) */}
        <ellipse cx="72" cy="196" rx="12" ry="6" fill="#f5d5d8" />
        <ellipse cx="128" cy="196" rx="12" ry="6" fill="#f5d5d8" />
      </svg>
    </div>
  );
}