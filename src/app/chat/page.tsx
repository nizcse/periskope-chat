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
import { useTheme } from '@/src/components/ThemeProvider'

export default function ChatPage() {
  const { selectedChatId } = useChatStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen w-screen bg-gray-900 overflow-x-hidden overflow-y-hidden">
      {/* Add theme toggle button */}
      <button 
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded"
      >
        Toggle Theme ({theme})
      </button>

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
          <main className="flex flex-[2.5] flex-col h-full h-0 min-h-full chat-main-background">
            {/* Chat Window */}
            <header className="h-[64px] border-b border-gray-800 bg-white dark:bg-gray-950 flex items-center px-6 w-full">
              <ChatHeader />
            </header>
            <section className="flex-1 overflow-y-auto p-6 chat-window-scrollbar">
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
      <style jsx global>{`
        .chat-window-scrollbar::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }

        .chat-window-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border: none;
        }

        .chat-window-scrollbar::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 0;
          border: none;
        }

        .chat-window-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: transparent;
          border: none;
        }
        /* For Firefox */
        .chat-window-scrollbar {
          scrollbar-width: none;
        }

        /* For Internet Explorer and Edge (Legacy) */
        .chat-window-scrollbar {
            -ms-overflow-style: none;
        }

        .chat-main-background {
          background-size: cover;
          background-repeat: repeat;
          background-attachment: fixed;
          background-image: url('/assets/image/backgroundLight.jpg');
        }

        /* Dark mode using data-theme attribute */
        [data-theme="dark"] .chat-main-background {
          background-image: url('/assets/image/backgroundDark.jpg');
        }
      `}</style>
    </div>
  )
} 