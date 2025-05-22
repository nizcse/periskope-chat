import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react'; // Import React for React.FormEvent type
import { useAuthStore } from '@/stores/authStore';

export const useLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuthStore(); // Get the signIn action from authStore

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation (you might want more robust validation)
    if (!emailOrPhone || !password) {
      setError('Please enter both email/phone and password.');
      setLoading(false);
      return;
    }

    // Determine if the input is likely an email or phone number
    // For simplicity, we'll assume email login using signInWithPassword for now.
    // Implementing phone number login with password would require looking up the email first.
    // Standard Supabase phone auth uses OTP (signInWithOtp).

    try {
      // Call the signIn action from the auth store
      await signIn(emailOrPhone, password);
      // If signIn is successful, the authStore will update the user state
      // The user will be redirected by a separate effect/logic listening to the user state change,
      // or you can redirect here if your authStore doesn't handle it.

      // Example redirect after successful login (if not handled by authStore listener)
       // router.push('/chat'); // Redirect to chat page after successful login - removed for now, assuming authStore handles redirection

    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return {
    emailOrPhone,
    setEmailOrPhone,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  };
}; 