import React from 'react';
import { useChatStore } from '@/stores/chatStore';
import { format } from 'date-fns';

export default function MessageList() {
  const { messages, getSelectedChat } = useChatStore();
  const selectedChat = getSelectedChat();

  if (!selectedChat) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender_id === selectedChat.participants[0].id ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg px-4 py-2 ${
              message.sender_id === selectedChat.participants[0].id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            }`}
          >
            <div className="text-sm">{message.content}</div>
            <div className="text-xs mt-1 opacity-70">
              {format(new Date(message.created_at), 'HH:mm')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}