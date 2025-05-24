"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase";
import { useChatStore } from "@/stores/chatStore";

export default function Home() {
  const router = useRouter();
  const { setUser, setSession } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(true);
  const {  fetchChats } = useChatStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('supabase.auth.token');
        
        if (!token) {
          router.push("/auth/login");
          return;
        }

        // Verify the session with Supabase
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          // If there's an error or no session, clear storage and redirect to login
          localStorage.removeItem('supabase.auth.token');
          setUser(null);
          setSession(null);
          router.push("/auth/login");
          return;
        }

        // If we have a valid session, update the store and redirect to chat
        setUser(session.user);
        setSession(session);
        router.push("/chat");
      } catch (error) {
        console.error("Auth verification error:", error);
        router.push("/auth/login");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, [router, setUser, setSession]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Show loading state while verifying authentication
  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return null;
}
