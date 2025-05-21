"use client";

import ChatSidebar from '@/components/ChatSidebar'
import ChatHeader from '@/components/ChatHeader'
import ChatWindow from '@/components/ChatWindow'
import { Modal } from '@/components/ui/Modal'
import MessageInput from '@/components/MessageInput'
import ChatParentHeader from '@/components/ChatParentHeader'
import SidebarNav from '@/components/ChatSidebar/SidebarNav'
import RightSidebar from '@/components/RightSidebar'
import { useChatStore } from '@/stores/chatStore'

export default function ChatPage() {
  const { selectedChatId } = useChatStore();

  return (
    <div className="flex h-screen w-screen bg-gray-900 overflow-x-hidden overflow-y-hidden">
      {/* Vertical Icon Bar (Left Sidebar)*/}
      <SidebarNav />

      {/* Main Content Area (Header, Sidebar/Chat, Right Sidebar) */}
      <div className="flex flex-col flex-1">

        {/* Header Area - Always show Parent Header */}
        <header className="h-[64px] border-b border-gray-800 bg-white dark:bg-gray-950 flex items-center px-6 w-full">
          {/* Always show Parent Header */}
          <ChatParentHeader />
        </header>

        {/* Content Area Below Header - Always show Sidebar, Main Chat Area, and Right Sidebar */}
        <div className="flex flex-1 h-full overflow-y-hidden">

          {/* Sidebar (Left Chat List) - Always visible with flex sizing */}
          <aside className="flex flex-[1] border-r border-gray-800 bg-gray-950 z-10">
             <ChatSidebar />
          </aside>

          {/* Main Chat Area (Chat Window + Input) - Always visible with flex sizing */}
          <main className="flex flex-[2.5] flex-col h-full h-0 min-h-full">
            {/* Chat Window */}
            <header className="h-[64px] border-b border-gray-800 bg-white dark:bg-gray-950 flex items-center px-6 w-full">
              <ChatHeader />
            </header>
            <section className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
              <ChatWindow />
            </section>
            {/* Message Input */}
            <footer className="h-[88px] bg-white dark:bg-gray-950 flex items-center px-6">
              <MessageInput />
            </footer>
          </main>

          {/* Right Sidebar - Always visible */}
          <aside className="flex-shrink-0 border-l border-gray-800 bg-gray-950 w-14">
             <RightSidebar />
          </aside>

          {/* Modal for Coming Soon features (remains visible)*/}
          <Modal />
        </div>
      </div>
    </div>
  )
} 