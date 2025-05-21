import { create } from 'zustand'
import { Database } from '@/types/supabase'

type Chat = {
  id: string;
  name: string;
  labels?: { name: string; color: string }[];
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  participants?: { name: string; avatarUrl?: string; color?: string }[];
  phoneCount?: number;
  phoneTotal?: number;
}

// Define the mock chats here
const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Test Skope Final 5',
    labels: [
      { name: 'Demo', color: 'text-yellow-700 bg-yellow-200' },
    ],
    lastMessage: "Support12: This doesn't go on Tuesday...",
    timestamp: 'Yesterday',
    unreadCount: 2,
    participants: [
       { name: 'User 1', avatarUrl: '', color: 'bg-blue-500' },
       { name: 'User 2', avatarUrl: '', color: 'bg-green-500' },
    ],
    phoneCount: 3,
    phoneTotal: 5,
  },
  {
    id: '2',
    name: 'Periskope Team Chat',
    labels: [
      { name: 'Demo', color: 'text-yellow-700 bg-yellow-200' },
      { name: 'internal', color: 'text-green-700 bg-green-200' },
    ],
    lastMessage: 'Periskope: Test message',
    timestamp: '28-Feb-25',
     participants: [
       { name: 'User A', avatarUrl: '', color: 'bg-red-500' },
       { name: 'User B', avatarUrl: '', color: 'bg-yellow-500' },
       { name: 'User C', avatarUrl: '', color: 'bg-purple-500' },
    ],
    phoneCount: 5,
    phoneTotal: 6,
  },
  {
    id: '3',
    name: '+91 99999 99999',
    labels: [
      { name: 'Demo', color: 'text-yellow-700 bg-yellow-200' },
      { name: 'Signup', color: 'text-green-700 bg-green-200' },
    ],
    lastMessage: "Hi there, I'm Swapnika, Co-Founder of ...",
    timestamp: '25-Feb-25',
     participants: [
       { name: 'User X', avatarUrl: '', color: 'bg-indigo-500' },
    ],
    phoneCount: 1,
    phoneTotal: 1,
  },
    {
    id: '4',
    name: 'Test Demo17',
    labels: [
      { name: 'Content', color: 'text-green-700 bg-green-200' },
    ],
    lastMessage: 'Rohosen: 123',
    timestamp: '25-Feb-25',
     participants: [
       { name: 'User Y', avatarUrl: '', color: 'bg-pink-500' },
    ],
    phoneCount: 2,
    phoneTotal: 2,
  },
  {
    id: '5',
    name: 'Test El Centro',
    labels: [
      { name: 'Demo', color: 'text-yellow-700 bg-yellow-200' },
    ],
    lastMessage: 'Roshnaq: Hello, Ahmadport!',
    timestamp: '04-Feb-25',
     participants: [
       { name: 'Roshnaq Airtel', avatarUrl: '', color: 'bg-green-500' },
      { name: 'Roshnaq Jio', avatarUrl: '', color: 'bg-blue-500' },
      { name: 'Bharat Kumar Ramesh', avatarUrl: '', color: 'bg-yellow-500' },
      { name: 'Periskope', avatarUrl: '', color: 'bg-gray-400' },
    ],
    phoneCount: 5,
    phoneTotal: 6,
  },
  // ...add more mock chats as needed
]

interface ChatState {
  chats: Chat[]; // Use the local Chat type
  selectedChatId: string | null;
  messages: any[]; // Replace with actual message type
  loading: boolean;
  selectChat: (id: string) => void;
  // Add a getter for the selected chat data
  getSelectedChat: () => Chat | undefined;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: mockChats, // Initialize with mock chats
  selectedChatId: null,
  messages: [], // Initialize messages
  loading: false,
  selectChat: (id) => set({ selectedChatId: id }),
  // Implement the getter
  getSelectedChat: () => {
    const state = get();
    return state.chats.find(chat => chat.id === state.selectedChatId);
  },
})); 