export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
        }
      }
      chats: {
        Row: {
          id: string
          is_group: boolean
          participant_ids: string[]
        }
        Insert: {
          id?: string
          is_group: boolean
          participant_ids: string[]
        }
        Update: {
          id?: string
          is_group?: boolean
          participant_ids?: string[]
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          sender_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          sender_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          sender_id?: string
          content?: string
          created_at?: string
        }
      }
      labels: {
        Row: {
          id: string
          chat_id: string
          name: string
        }
        Insert: {
          id?: string
          chat_id: string
          name: string
        }
        Update: {
          id?: string
          chat_id?: string
          name?: string
        }
      }
      assignments: {
        Row: {
          id: string
          chat_id: string
          user_id: string
        }
        Insert: {
          id?: string
          chat_id: string
          user_id: string
        }
        Update: {
          id?: string
          chat_id?: string
          user_id?: string
        }
      }
      attachments: {
        Row: {
          id: string
          message_id: string
          file_url: string
          type: string
        }
        Insert: {
          id?: string
          message_id: string
          file_url: string
          type: string
        }
        Update: {
          id?: string
          message_id?: string
          file_url?: string
          type?: string
        }
      }
    }
  }
} 