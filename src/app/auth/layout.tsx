import { APP_NAME } from '@/lib/constants';
import React from 'react';

export const metadata = {
  title: `${APP_NAME} - Authentication`,
};

export default function AuthLayout({
  children,
}: {children: React.ReactNode}) {
  return (
    <div className="auth-layout">
      {children}
    </div>
  );
} 