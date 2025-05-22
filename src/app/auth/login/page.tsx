"use client";

import React from 'react';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 auth-background">
      <div className="flex items-center justify-center w-full max-w-6xl p-8">
        <div className="flex-shrink-0 mr-12 text-6xl font-bold text-green-600 dark:text-green-400">{APP_NAME}</div>
        <div className="flex-grow flex justify-center">
          <div className="w-md px-20 py-16 mt-4 text-left bg-white dark:bg-gray-950 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white relative z-10">Login to your account</h3>
            <form action="">
              <div className="mt-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
                  <input type="text" placeholder="Email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
                  <input type="password" placeholder="Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <button className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">Login</button>
                  <a href="#" className="text-sm text-green-600 dark:text-green-400 hover:underline">Forgot password?</a>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
                  <Link href="/auth/signup" className="text-green-600 dark:text-green-400 hover:underline">Sign Up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 