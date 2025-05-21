"use client";

import { FiChevronLeft, FiRefreshCw, FiEdit3, FiMenu, FiLayout, FiScissors, FiUser, FiAtSign, FiFolder, FiSettings } from 'react-icons/fi';

const navItems = [
  { icon: <FiChevronLeft size={20} />, label: 'Back' },
  { icon: <FiRefreshCw size={20} />, label: 'Refresh' },
  { icon: <FiEdit3 size={20} />, label: 'Edit' },
  { icon: <FiMenu size={20} />, label: 'Menu' },
  { icon: <FiLayout size={20} />, label: 'Layout' },
  { icon: <FiScissors size={20} />, label: 'Scissors' },
  { icon: <FiUser size={20} />, label: 'User' },
  { icon: <FiAtSign size={20} />, label: 'Mention' },
  { icon: <FiFolder size={20} />, label: 'Files' },
  { icon: <FiSettings size={20} />, label: 'Settings' },
];

export default function RightSidebar() {
  return (
    <div className="flex flex-col items-center gap-4 py-3 bg-white dark:bg-gray-950 h-full w-14 border-l border-gray-200 dark:border-gray-800 flex-shrink-0">
      {navItems.map((item) => (
        <button
          key={item.label}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={item.label}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
} 