"use client";
import { useAuthStore } from '@/stores/authStore';
import { useChatStore } from '@/stores/chatStore';
import { useState } from 'react';
import { FiSmile, FiSend, FiMic, FiPaperclip, FiClock, FiRefreshCw, FiMapPin, FiStar } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function MessageInput() {
  const [message, setMessage] = useState('');
  const { user} = useAuthStore();
  const { sendMessage, loading } = useChatStore();
  
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // TODO: send message logic
    try {
    

      await sendMessage(message.trim(), user);
      setMessage(''); // Clear input after sending
    } catch (error) {
      console.error('Failed to send message:', error);
    }
    setMessage('');
  };

  return (
    <div className="flex flex-col w-full gap-2">
      

      {/* Input field and Send button */}
      <div className="flex items-center w-full gap-2">
        <input
          type="text"
          className="flex-1 rounded-full border border-gray-300 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Message..."
          value={message}
          disabled={loading}
          onChange={e => setMessage(e.target.value)}
        />

        {/* Send button */}
        <button
          type="submit"
          className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors duration-200 shadow-md"
          aria-label="Send"
          onClick={handleSend}
        >
          <FiSend size={24} />
        </button>
      </div>
      {/* Icons bar above input */}
      <div className="flex items-center gap-4 px-2">
        <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Attach Files">
          <FiPaperclip size={20} />
        </button>
        <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Emoji">
          <FiSmile size={20} />
        </button>
        <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Schedule Message">
          <FiClock size={20} />
        </button>
        <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Redo">
          <FiRefreshCw size={20} />
        </button>
        <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Pin">
          <FiMapPin size={20} />
        </button>
        <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Mark as Important">
          <FiStar size={20} />
        </button>
        {/* Microphone icon - in the top bar as per screenshot */}
        <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Voice Message">
          <FiMic size={20} />
        </button>
        {/* Periskope label/dropdown below input - moved here for now */}
        <div className="flex items-center justify-end w-full">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
            <span className="font-semibold">Periskope</span>
            <IoMdArrowDropdown size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
