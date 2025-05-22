import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import React from 'react'; // Import React for React.FormEvent type

export const useSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Set loading to true when signup starts

    // Basic Validation with Regex
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\/]).{8,}$/;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,30}$/;
    const nameRegex = /^[a-zA-Z\s\-']{2,}$/;

    if (!nameRegex.test(name)) {
      setError('Please enter a valid name.');
      setLoading(false); // Set loading to false on validation error
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false); // Set loading to false on validation error
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false); // Set loading to false on validation error
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.');
      setLoading(false); // Set loading to false on validation error
      return;
    }

    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number.');
      setLoading(false); // Set loading to false on validation error
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
          phone_number: phoneNumber,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false); // Set loading to false on Supabase error
    } else if (data && data.user) { // Check for data and data.user explicitly
      alert('Signup successful! Please check your email to confirm your account.');
      router.push('/auth/login');
      setLoading(false); // Set loading to false on success
    } else if (data && !data.user) {
        setError('Signup process completed, but user data was not returned. Please check your email for confirmation.');
        router.push('/auth/login');
        setLoading(false); // Set loading to false in this scenario
    } else {
      setError('An unexpected error occurred during signup and no data was returned.');
      setLoading(false); // Set loading to false in fallback scenario
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    phoneNumber,
    setPhoneNumber,
    error,
    loading, // Return loading state
    handleSignUp,
  };
}; 