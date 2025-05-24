"use client";

import { format, isToday, isYesterday, isThisYear } from 'date-fns';
import { useChatStore } from '@/stores/chatStore';
import SentMessageBubble from './SentMessageBubble';
import ReceivedMessageBubble from './ReceivedMessageBubble';
import MessageInput from './MessageInput';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useRef } from 'react';

interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender: {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
  };
}

// Mock messages for demonstration
const mockMessages1 = [
  {
    id: 'm1',
    chatId: '1',
    isOwn: false,
    senderName: 'Roshnaq Airtel',
    phoneNumber: '+91 63846 47925',
    content: 'Hello, South Euna!',
    timestamp: '08:01',
    date: '22-01-2025',
  },
  {
    id: 'm2',
    chatId: '1',
    isOwn: false,
    senderName: 'Roshnaq Airtel',
    phoneNumber: '+91 63846 47925',
    content: 'Hello, Livonia!',
    timestamp: '08:01',
    date: '23-01-2025',
  },
  {
    id: 'm3',
    chatId: '1',
    isOwn: false,
    senderName: 'Roshnaq Airtel',
    phoneNumber: '+91 63846 47925',
    content: 'CDERT',
    timestamp: '09:49',
    date: '23-01-2025',
  },
  {
    id: 'm4',
    chatId: '1',
    isOwn: true,
    senderName: 'Periskope',
    phoneNumber: '+91 99718 44008',
    content: 'test el centro',
    timestamp: '09:49',
    date: '23-01-2025',
    senderEmail: 'bharat@hashlabs.dev'
  },
  {
    id: 'm5',
    chatId: '1',
    isOwn: true,
    senderName: 'Periskope',
    phoneNumber: '+91 99718 44008',
    content: 'testing',
    timestamp: '09:49',
    date: '23-01-2025',
    senderEmail: 'bharat@hashlabs.dev'
  },
  {
    id: 'm6',
    chatId: '1',
    isOwn: true,
    senderName: 'Periskope',
    phoneNumber: '+91 99718 44008',
    content: 'testing',
    timestamp: '09:49',
    date: '23-01-2025',
    senderEmail: 'bharat@hashlabs.dev'
  },
  {
    id: 'm7',
    chatId: '1',
    isOwn: true,
    senderName: 'Periskope',
    phoneNumber: '+91 99718 44008',
    content: 'testing',
    timestamp: '09:49',
    date: '23-01-2025',
    senderEmail: 'bharat@hashlabs.dev'
  },
  {
    id: 'm8',
    chatId: '1',
    isOwn: true,
    senderName: 'Periskope',
    phoneNumber: '+91 99718 44008',
    content: 'testing',
    timestamp: '09:49',
    date: '23-01-2025',
    senderEmail: 'bharat@hashlabs.dev'
  },
]

function groupMessagesByDate(messages: Message[]) {
  return messages.reduce<Record<string, Message[]>>((groups, msg) => {
    const date = new Date(msg.created_at);
    let groupKey: string;

    if (isToday(date)) {
      groupKey = 'Today';
    } else if (isYesterday(date)) {
      groupKey = 'Yesterday';
    } else if (isThisYear(date)) {
      groupKey = format(date, 'MMMM d'); // e.g., "March 15"
    } else {
      groupKey = format(date, 'MMMM d, yyyy'); // e.g., "March 15, 2023"
    }

    (groups[groupKey] = groups[groupKey] || []).push(msg);
    return groups;
  }, {});
}

export default function ChatWindow() {
  const { messages: mockMessages, getSelectedChat, selectedChatId, loading } = useChatStore();
  const selectedChat = getSelectedChat();
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages are loaded
  useEffect(() => {
    if (selectedChatId && !loading && mockMessages.length > 0) {
      scrollToBottom();
    }
  }, [selectedChatId, loading, mockMessages]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // Only auto-scroll if user is already near bottom
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      if (isNearBottom) {
        scrollToBottom();
      }
    }
  }, [mockMessages]);

  if (!selectedChat) {
    return (
      <div className="flex flex-col w-full items-center justify-center text-gray-400">
        <span className="text-lg">Select a chat to start messaging</span>
      </div>
    );
  }

  // Filter and group messages for the selected chat
  const messages = mockMessages.filter(m => m.chat_id === selectedChat.id)
  const grouped = groupMessagesByDate(messages)
  const dates = Object.keys(grouped).sort()

  return (
    <div className="flex-1 flex flex-col h-full">
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4">
        {Object.entries(grouped).map(([date, msgs]) => (
          <div key={date} className="mb-6">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                {date}
              </span>
            </div>
            {msgs.map((message) => (
              message.sender_id == user?.id ? (
                <SentMessageBubble
                  key={message.id}
                  senderName={message.sender.name || message.sender.email}
                  content={message.content}
                  timestamp={message.created_at}
                  avatarUrl={message.sender.avatarUrl}
                />
              ) : (
                <ReceivedMessageBubble
                  key={message.id}
                  senderName={message.sender.name || message.sender.email}
                  content={message.content}
                  timestamp={message.created_at}
                  avatarUrl={message.sender.avatarUrl}
                />
              )
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <style jsx>{`
        .chat-window-scrollbar::-webkit-scrollbar {
          width: 0;
          background: transparent; /* Ensure the background is transparent */
        }

        .chat-window-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border: none; /* Remove any potential border */
        }

        .chat-window-scrollbar::-webkit-scrollbar-thumb {
          background-color: transparent; /* Make thumb transparent */
          border-radius: 0;
          border: none; /* Remove any potential border on the thumb */
        }

        .chat-window-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: transparent; /* Keep thumb transparent on hover */
          border: none; /* Remove any potential border on hover */
        }
        /* For Firefox */
        .chat-window-scrollbar {
          scrollbar-width: none; /* Hide scrollbar in Firefox */
        }

        /* For Internet Explorer and Edge (Legacy) */
        .chat-window-scrollbar {
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
} 