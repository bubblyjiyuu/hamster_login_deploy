import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from './hooks/useMousePosition';
import { useHamsterState } from './hooks/useHamsterState';
import HamsterCanvas from './components/HamsterCanvas/HamsterCanvas';
import LoginForm from './components/LoginForm/LoginForm';

export default function App() {
  const mousePos = useMousePosition();
  const {
    isSleeping,
    toggleSleep,
    focusedField,
    showPassword,
    setShowPassword,
    isSubmitting,
    loginStatus,
    errorMessage,
    successMessage,
    currentUser,
    isSignUp,
    switchAuthMode,
    handleSignUp,
    handleSignIn,
    handleLogout,
    handleFocus,
    handleBlur
  } = useHamsterState();

  return (
    <div className="min-h-screen bg-[#fcf8f5] flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <motion.div
        layout
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full ${
          isSleeping ? 'max-w-md' : 'max-w-4xl'
        } bg-white rounded-[32px] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col lg:flex-row`}
      >
        {/* Left Side: Interactive Hamster */}
        <HamsterCanvas
          mousePos={mousePos}
          focusedField={focusedField}
          showPassword={showPassword}
          loginStatus={loginStatus}
          currentUser={currentUser}
          isSleeping={isSleeping}
          onToggleSleep={toggleSleep}
        />

        {/* Right Side: Login Form (Muncul saat Bangun) */}
        <AnimatePresence mode="wait">
          {!isSleeping && (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="w-full lg:w-1/2 flex"
            >
              <LoginForm
                onFocus={handleFocus}
                onBlur={handleBlur}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isSubmitting={isSubmitting}
                loginStatus={loginStatus}
                errorMessage={errorMessage}
                successMessage={successMessage}
                isSignUp={isSignUp}
                onSwitchMode={switchAuthMode}
                onSignUp={handleSignUp}
                onSignIn={handleSignIn}
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
