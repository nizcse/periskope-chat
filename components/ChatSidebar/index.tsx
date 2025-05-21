"use client";

import SidebarNav from './SidebarNav'
import ChatListHeader from './ChatListHeader'
import ChatListItem from './ChatListItem'
import { useChatStore } from '@/stores/chatStore'

export default function ChatSidebar() {
  const { chats, selectedChatId, selectChat } = useChatStore();

  return (
    <div className="flex h-full w-full">
      {/* Chat List and Filters */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-950">
        <ChatListHeader />
        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div key={chat.id} onClick={() => selectChat(chat.id)} className="cursor-pointer">
              <ChatListItem {...chat} id={chat.id} active={selectedChatId === chat.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 