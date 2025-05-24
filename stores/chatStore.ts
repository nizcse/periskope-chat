import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { RealtimeChannel, User, UserMetadata } from '@supabase/supabase-js'

export interface Message {
  id: string
  chat_id: string
  sender_id: string
  content: string
  created_at: string
  sender: {
    id: string
    email: string
    name?: string
    avatarUrl?: string
  }
}

export interface Chat {
  id: string
  name: string
  created_at: string
  participants: {
    id: string
    email: string
    display_name?: string
    avatar_url?: string
  }[]
  last_message?: {
  content: string;
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  phone?:string;
  last_updated :Date|string;
};
}

interface DatabaseMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender: {
    id: string;
    email: string;
    name: string | null;
    avatar_url: string | null;
  };
}

interface ChatState {
  chats: Chat[]
  selectedChatId: string | null
  messages: Message[]
  loading: boolean
  error: string | null
  realtimeChannel: RealtimeChannel | null
  currentUserId: string | null
  getCurrentUserId: () => Promise<string | null>
  selectChat: (id: string) => void
  getSelectedChat: () => Chat | undefined
  sendMessage: (content: string, user: null | User) => Promise<void>
  fetchChats: () => Promise<void>
  fetchMessages: (chatId: string) => Promise<void>
  subscribeToMessages: (chatId: string) => void
  unsubscribeFromMessages: () => void
  createChat: (name: string, participantEmails: string[]) => Promise<void>
  onlineUsers: Set<string>
  updateOnlineStatus: () => void
  typingUsers: Record<string, Set<string>>
  setTyping: (chatId: string, isTyping: boolean) => void
  reconnect: () => Promise<void>
  subscribeToChats: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  selectedChatId: null,
  messages: [],
  loading: false,
  error: null,
  realtimeChannel: null,
  currentUserId: null,
  onlineUsers: new Set(),
  typingUsers: {},

  getCurrentUserId: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    return user.id
  },

  selectChat: async (id) => {
    set({ selectedChatId: id, messages: [] })
    const { fetchMessages, subscribeToMessages, unsubscribeFromMessages } = get()
    
    // Unsubscribe from previous chat if any
    unsubscribeFromMessages()
    
    // Fetch messages and subscribe to new ones
    await fetchMessages(id)
    subscribeToMessages(id)
  },

  getSelectedChat: () => {
    const state = get()
    return state.chats.find(chat => chat.id === state.selectedChatId)
  },

  createChat: async (name: string, participantEmails: string[]) => {
    set({ loading: true, error: null })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Get user IDs for all participants
      const participantIds = [user.id] // Start with current user
      
      // Get IDs for other participants
      for (const email of participantEmails) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .single()

        if (userError) {
          console.error(`User not found: ${email}`)
          continue
        }

        participantIds.push(userData.id)
      }

      // Create chat with participant_ids array
      const { data: chat, error: chatError } = await supabase
        .from('chats')
        .insert({ 
          name,
          participant_ids: participantIds,
          is_group: participantEmails.length > 0 // true if there are other participants
        })
        .select()
        .single()

      if (chatError) throw chatError

      // Refresh chats list
      await get().fetchChats()
      
      // Select the new chat
      get().selectChat(chat.id)

    } catch (error: any) {
      set({ error: error.message })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  sendMessage: async (content: string, user:User|null) => {
    const { selectedChatId, getCurrentUserId } = get()
    if (!selectedChatId) return
    try {
      const userId = await getCurrentUserId()
      if (!userId) throw new Error('User not authenticated')

      // First insert the message
      const { data: message, error: messageError } = await supabase
        .from('messages')
        .insert({
          chat_id: selectedChatId,
          sender_id: userId,
          content,
          sender_name: user?.user_metadata?.display_name || null,
          sender_phone_number: user?.user_metadata?.phone_number || null,
        })
        .select()
        .single()

      if (messageError) throw messageError

      // Then update the chat's last_message
      const { error: chatError } = await supabase
        .from('chats')
        .update({
          last_message: {
            content: content,
            id: userId,
            email: user?.user_metadata?.email || '',
            name: user?.user_metadata?.display_name || null,
            avatarUrl: user?.user_metadata?.avatar_url || null,
            phone: user?.phone,
            last_updated: new Date().toISOString()
          }
        })
        .eq('id', selectedChatId)

      if (chatError) throw chatError

      // Refresh chats to update the UI
      await get().fetchChats()
    } catch (error: any) {
      set({ error: error.message })
    }
  },

  fetchChats: async () => {
    set({ loading: true, error: null })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      console.log('Current user ID:', user.id)

      // First, let's get all chats without filtering
      const { data: chats, error } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('All chats:', chats)

      if (error) throw error

      // Filter chats where the user is a participant
      const userChats = chats?.filter(chat => 
        chat.participant_ids.includes(user.id)
      ) || []

      console.log('Filtered user chats:', userChats)

      // Get all unique participant IDs
      const allParticipantIds = [...new Set(
        userChats.flatMap(chat => chat.participant_ids)
      )]

      console.log('All participant IDs:', allParticipantIds)

      // Fetch all participants in one query
      const { data: participants } = await supabase
        .from('users')
        .select('id, email, display_name')
        .in('id', allParticipantIds)

      console.log('Fetched participants:', participants)

      // Create a map for quick participant lookup
      const participantMap = new Map(
        participants?.map(p => [p.id, p]) || []
      )

      // Transform the data to match the Chat interface
      const transformedChats = userChats.map(chat => ({
        ...chat,
        participants: chat.participant_ids.map((id: string) => 
          participantMap.get(id) || { id, email: '', name: '' }
        )
      }))

      console.log('Final transformed chats:', transformedChats)

      set({ chats: transformedChats })
    } catch (error: any) {
      console.error('Error in fetchChats:', error)
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },

  fetchMessages: async (chatId: string) => {
    set({ loading: true, error: null })
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          id,
          chat_id,
          sender_id,
          content,
          created_at,
          sender_name,
          sender_phone_number
        `)
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true })
        console.log(messages,"messages")

      if (error) throw error

      // Transform the messages to match our interface
      const transformedMessages: Message[] = (messages || []).map((msg: any) => ({
        id: msg.id,
        chat_id: msg.chat_id,
        sender_id: msg.sender_id,
        content: msg.content,
        created_at: msg.created_at,
        sender: {
          id: msg.sender_id,
          email: '', // We don't have email in the messages table
          name: msg.sender_name,
          avatarUrl: undefined // We don't have avatar in the messages table
        }
      }))

      set({ messages: transformedMessages })
    } catch (error: any) {
      console.error('Error fetching messages:', error)
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },

  subscribeToMessages: (chatId: string) => {
    const channel = supabase
      .channel(`chat:${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`
        },
        async (payload) => {
          const { data: { user } } = await supabase.auth.getUser()
          if (!user) return

          // Fetch the new message with user details
          const { data: message, error: messageError } = await supabase
            .from('messages')
            .select(`
              id,
              chat_id,
              sender_id,
              content,
              created_at,
              sender_name,
              sender_phone_number
            `)
            .eq('id', payload.new.id)
            .single()

          if (messageError) {
            console.error('Error fetching message details:', messageError)
            return
          }

          if (message) {
            const transformedMessage: Message = {
              id: message.id,
              chat_id: message.chat_id,
              sender_id: message.sender_id,
              content: message.content,
              created_at: message.created_at,
              sender: {
                id: message.sender_id,
                email: '', // We don't have email in the messages table
                name: message.sender_name,
                avatarUrl: undefined
              }
            }
            set(state => ({
              messages: [...state.messages, transformedMessage]
            }))
          }
        }
      )
      .subscribe()

    set({ realtimeChannel: channel })
  },

  unsubscribeFromMessages: () => {
    const { realtimeChannel } = get()
    if (realtimeChannel) {
      realtimeChannel.unsubscribe()
      set({ realtimeChannel: null })
    }
  },

  updateOnlineStatus: async () => {
    const userId = await get().getCurrentUserId()
    if (!userId) return

    const channel = supabase.channel('online_users')
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState()
        const onlineUsers = new Set(
          Object.values(presenceState)
            .flat()
            .map((user: any) => user.user_id)
        )
        set({ onlineUsers })
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ user_id: userId })
        }
      })
  },

  setTyping: async (chatId: string, isTyping: boolean) => {
    const userId = await get().getCurrentUserId()
    if (!userId) return

    const channel = supabase.channel(`typing:${chatId}`)
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState()
        const typingUsers = Object.entries(presenceState).reduce((acc, [chatId, users]) => {
          acc[chatId] = new Set(
            users
              .filter((user: any) => user.typing)
              .map((user: any) => user.user_id)
          )
          return acc
        }, {} as Record<string, Set<string>>)
        set({ typingUsers })
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ user_id: userId, typing: isTyping })
        }
      })
  },

  reconnect: async () => {
    const { selectedChatId, subscribeToChats, subscribeToMessages } = get()
    
    // Reconnect to all subscriptions
    await subscribeToChats()
    if (selectedChatId) {
      await subscribeToMessages(selectedChatId)
    }
  },

  subscribeToChats: () => {
    console.log('working')
    const channel = supabase
      .channel('chats')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'chats'
        },
        async () => {
          // Refresh chats when any change occurs
          await get().fetchChats();
        }
      )
      .subscribe();

    set({ realtimeChannel: channel });
  }
})) 