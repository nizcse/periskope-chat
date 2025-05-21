"use client";

import { useChatStore } from '@/stores/chatStore'
import SentMessageBubble from './SentMessageBubble'
import ReceivedMessageBubble from './ReceivedMessageBubble'

// Mock messages for demonstration
const mockMessages = [
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

type Message = typeof mockMessages[number];

function groupMessagesByDate(messages: Message[]) {
  return messages.reduce<Record<string, Message[]>>((groups, msg) => {
    (groups[msg.date] = groups[msg.date] || []).push(msg)
    return groups
  }, {})
}

export default function ChatWindow() {
  const { selectedChatId } = useChatStore();

  if (!selectedChatId) {
    return (
      <div className="flex flex-col w-full items-center justify-center text-gray-400">
        <span className="text-lg">Select a chat to start messaging</span>
      </div>
    );
  }

  // Filter and group messages for the selected chat
  const messages = mockMessages.filter(m => m.chatId === selectedChatId)
  const grouped = groupMessagesByDate(messages)
  const dates = Object.keys(grouped).sort()

  return (
    <div className="flex flex-col w-full ">
      <div className="flex-1 overflow-y-auto px-2">
        {dates.map(date => (
          <div key={date}>
            {/* Date divider */}
            <div className="flex justify-center my-4">
              <span className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full">
                {date}
              </span>
            </div>
            {/* Messages for this date */}
            <div className="flex flex-col gap-2">
              {grouped[date].map(msg => (
                msg.isOwn ? (
                  <SentMessageBubble key={msg.id} {...msg} />
                ) : (
                  <ReceivedMessageBubble key={msg.id} {...msg} />
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 