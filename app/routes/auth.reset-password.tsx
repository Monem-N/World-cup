import React, { useState, useEffect } from 'react';
import { PasswordResetForm } from '../components/auth/PasswordResetForm';
import { useLocation } from 'react-router';

export default function ResetPasswordPage() {
  const location = useLocation();
  const [mode, setMode] = useState<'request' | 'reset'>('request');

  useEffect(() => {
    // Check if there's recovery data in the URL when component mounts
    const hasRecoveryData = location.hash.length > 0;

    console.log('Reset password page - URL check:', {
      href: location.pathname + location.search + location.hash,
      hasRecoveryData,
      hash: location.hash,
      currentMode: mode
    });

    // If we detect recovery data, switch to reset mode and stay there
    // This prevents switching back to request mode when Supabase clears the hash
    if (hasRecoveryData && mode === 'request') {
      console.log('Switching to reset mode due to recovery data detected');
      setMode('reset');
    }
  }, [location.hash, mode]);

  return <PasswordResetForm mode={mode} />;
}
