"use client";

import { useEffect, useState } from 'react';
import ChatListHeader from './ChatListHeader'
import ChatListItem from './ChatListItem'
import { useChatStore } from '@/stores/chatStore'
import CreateChatModal from '@/components/CreateChatModal'

export default function ChatSidebar() {
  const { chats, selectedChatId, selectChat, fetchChats, subscribeToChats } = useChatStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Initial fetch
    fetchChats();
    // Subscribe to real-time updates
    subscribeToChats();
  }, []);

  console.log(chats,"chats")
  return (
    <div className="flex h-full w-full">
      {/* Chat List and Filters */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-950">
        <ChatListHeader onCreateChat={() => setIsCreateModalOpen(true)} />
        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div key={chat.id} onClick={() => selectChat(chat.id)} className="cursor-pointer">
              <ChatListItem {...chat} id={chat.id} active={selectedChatId === chat.id} />
            </div>
          ))}
        </div>
      </div>

      {/* Create Chat Modal */}
      <CreateChatModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  )
} 