"use client";
import { FiRefreshCw, FiHelpCircle, FiSearch, FiMoreVertical } from 'react-icons/fi';
import { BsFillCircleFill } from 'react-icons/bs';
import { useChatStore } from '@/stores/chatStore';
import { HiOutlineUsers } from "react-icons/hi";

const mockChats = [
  {
    id: '1',
    name: 'Test El Centro',
    participants: [
      { name: 'Roshnaq Airtel', avatarUrl: '', color: 'bg-green-500' },
      { name: 'Roshnaq Jio', avatarUrl: '', color: 'bg-blue-500' },
      { name: 'Bharat Kumar Ramesh', avatarUrl: '', color: 'bg-yellow-500' },
      { name: 'Periskope', avatarUrl: '', color: 'bg-gray-400' },
      // ...add more as needed
    ],
    phoneCount: 5,
    phoneTotal: 6,
  },
  // ...add more mock chats as needed
];

export default function ChatHeader() {
  const { selectedChatId, getSelectedChat } = useChatStore();
  const chat = getSelectedChat();

  if (!chat) {
    return (
      <div className="flex items-center w-full h-full justify-center text-gray-400 dark:text-gray-600">
        <span className="text-lg">Select a chat</span>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full gap-4">
      {/* Left side: Chat icon, name and participants */}
      <div className="flex items-center gap-3">
        {/* Chat type icon - Placeholder */} {/* Replace with actual logic based on chat type */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700">
          <HiOutlineUsers size={20} className="text-gray-600 dark:text-gray-300" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-white truncate text-base">
            {chat.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {chat.participants?.map((p) => p.name).join(', ')}
          </span>
        </div>
      </div>

      {/* Right side: Action buttons, Phone count, Avatars, Search, More */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Action buttons */}
         {/* Avatars */}
        <div className="flex -space-x-1 overflow-hidden">
        {chat.participants?.slice(0, 4).map((p, i) => (
          <div
            key={p.name}
            className={`w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-white overflow-hidden ${p.color}`}
            style={{ zIndex: 10 - i }}
          >
            {p.avatarUrl ? (
              <img src={p.avatarUrl} alt={p.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="flex items-center justify-center w-full h-full text-gray-700 dark:text-gray-200 text-xs">{p.name[0]}</span>
            )}
          </div>
        ))}
        {chat.participants && chat.participants.length > 4 && (
          <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold bg-gray-400 text-white z-0">
            +{chat.participants.length - 4}
          </div>
        )}
      </div>
        {/* Search and more */}
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Search">
          <FiSearch size={18} className="text-gray-500 dark:text-gray-400"/>
        </button>
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="More">
          <FiMoreVertical size={18} className="text-gray-500 dark:text-gray-400"/>
        </button>
      </div>
    </div>
  );
} 