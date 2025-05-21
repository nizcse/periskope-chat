"use client";

import { FiRefreshCw, FiHelpCircle, FiDownload, FiBell, FiList } from 'react-icons/fi';

export default function ChatParentHeader() {
  return (
    <div className="flex flex-1 items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      {/* Left side: Chats text with icon */}
      <div className="flex items-center gap-2">
        <FiBell size={18} className="text-gray-500 dark:text-gray-400" /> {/* Placeholder icon, replace with actual chat icon if needed */}
        <span className="text-gray-900 dark:text-white font-semibold">chats</span>
      </div>

      {/* Right side: Action buttons */}
      <div className="flex items-center gap-2">
        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Refresh">
          <FiRefreshCw size={18} className="text-gray-500 dark:text-gray-400" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Help">
          <FiHelpCircle size={18} className="text-gray-500 dark:text-gray-400" />
        </button>
        {/* Phone count - Placeholder */}
        <div className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-50 dark:bg-yellow-900">
          <span className="text-xs text-gray-700 dark:text-gray-200 font-semibold">
            5 / 6 phones {/* Static placeholder */} 
          </span>
        </div>
        {/* Download button - Placeholder */}
        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Download">
          <FiDownload size={18} className="text-gray-500 dark:text-gray-400" />
        </button>
        {/* Bell button - Placeholder */}
        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Notifications">
          <FiBell size={18} className="text-gray-500 dark:text-gray-400" />
        </button>
        {/* List button - Placeholder */}
        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="List">
          <FiList size={18} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
} 