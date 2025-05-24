"use client";
import { FiSearch, FiFilter, FiSave, FiPlus } from 'react-icons/fi';
import { IoMdRefresh } from 'react-icons/io';
import { MdHelpOutline } from 'react-icons/md';

interface ChatListHeaderProps {
  onCreateChat: () => void;
}

export default function ChatListHeader({ onCreateChat }: ChatListHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      <span className="text-green-600 font-semibold text-sm bg-green-50 dark:bg-green-900 px-2 py-1 rounded mr-2">Custom filter</span>
      <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Save">
        <FiSave size={18} />
      </button>
      <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded px-2 mx-2">
        <FiSearch className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-sm flex-1 py-1 text-gray-700 dark:text-gray-200"
        />
      </div>
      <button 
        onClick={onCreateChat}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-green-600" 
        title="Create New Chat"
      >
        <FiPlus size={18} />
      </button>
      <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Filter">
        <FiFilter size={18} />
      </button>
      <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Refresh">
        <IoMdRefresh size={18} />
      </button>
      <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Help">
        <MdHelpOutline size={18} />
      </button>
    </div>
  );
} 