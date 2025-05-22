"use client";

import { FaHome, FaComments, FaUserFriends, FaTasks, FaCog } from 'react-icons/fa';
import { IoMdChatbubbles } from 'react-icons/io';
import { MdOutlineLabel } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import { BsFillLightningFill } from 'react-icons/bs';

const navItems = [
  { icon: <FaHome size={22} />, label: 'Home' },
  { icon: <IoMdChatbubbles size={22} />, label: 'Chats', active: true },
  { icon: <FaUserFriends size={22} />, label: 'Contacts' },
  { icon: <MdOutlineLabel size={22} />, label: 'Labels' },
  { icon: <HiOutlineUsers size={22} />, label: 'Assignments' },
  { icon: <BsFillLightningFill size={22} />, label: 'Lightning' },
  { icon: <FaCog size={22} />, label: 'Settings' },
];

export default function SidebarNav() {
  return (
    <nav className="flex flex-col items-center gap-2 py-4 bg-white dark:bg-gray-950 h-full w-16 border-r border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900">
        <span className="text-green-600 font-bold text-lg">P</span>
      </div>
      {/* Nav Icons */}
      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item, idx) => (
          <button
            key={item.label}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${item.active ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </nav>
  );
} 