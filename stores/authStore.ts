import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,
      signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        
        // Update both user and session
        set({ 
          user: data.user,
          session: data.session,
          loading: false 
        })

        // Store the session token in localStorage
        if (data.session?.access_token) {
          localStorage.setItem('supabase.auth.token', data.session.access_token)
        }
      },
      signOut: async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        // Clear both user and session
        set({ 
          user: null,
          session: null,
          loading: false 
        })

        // Remove the session token from localStorage
        localStorage.removeItem('supabase.auth.token')
      },
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
    }),
    {
      name: 'auth-storage', // unique name for localStorage
      partialize: (state) => ({ 
        user: state.user,
        session: state.session 
      }), // only persist these fields
    }
  )
) 