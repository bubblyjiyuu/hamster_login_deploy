import { useRef, useState } from 'react';

export function useHamsterState() {
  const [isSleeping, setIsSleeping] = useState(true);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true); // Default tampilkan Sign Up terlebih dahulu

  // Data user hanya di memori (hilang saat refresh / server dimatikan)
  const registeredUsersRef = useRef([]);

  const clearStatus = () => {
    setLoginStatus(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const toggleSleep = () => {
    setIsSleeping((prev) => !prev);
    setFocusedField(null);
    if (!currentUser) {
      clearStatus();
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
    if (loginStatus === 'error') {
      setLoginStatus(null);
      setErrorMessage('');
    }
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const switchAuthMode = (nextIsSignUp) => {
    setIsSignUp(nextIsSignUp);
    clearStatus();
  };

  const handleSignUp = (email, password) => {
    setIsSubmitting(true);
    clearStatus();

    setTimeout(() => {
      setIsSubmitting(false);

      const normalizedEmail = email.trim().toLowerCase();
      const existingUser = registeredUsersRef.current.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (existingUser) {
        setLoginStatus('error');
        setErrorMessage('Email sudah terdaftar! Silakan pilih tab Sign In.');
        return;
      }

      registeredUsersRef.current = [
        ...registeredUsersRef.current,
        { email: email.trim(), password }
      ];

      setIsSignUp(false);
      setLoginStatus('success');
      setSuccessMessage('Akun berhasil dibuat. Silakan Sign In.');
    }, 800);
  };

  const handleSignIn = (email, password) => {
    setIsSubmitting(true);
    clearStatus();

    setTimeout(() => {
      setIsSubmitting(false);

      const user = registeredUsersRef.current.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (user) {
        setLoginStatus('success');
        setCurrentUser(user);
        setSuccessMessage('');
      } else {
        setLoginStatus('error');
        setErrorMessage('Email atau password salah / belum terdaftar!');
      }
    }, 800);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    clearStatus();
    setIsSignUp(false);
    setFocusedField(null);
  };

  return {
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
  };
}
