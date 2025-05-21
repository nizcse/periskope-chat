import { FaUserCircle } from 'react-icons/fa';
import { useChatStore } from '@/stores/chatStore';

interface Label {
  name: string;
  color: string; // Tailwind color class
}

interface ChatListItemProps {
  id: string;
  active?: boolean;
  avatarUrl?: string;
  name: string;
  labels?: Label[];
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
}

export default function ChatListItem({
  id,
  active,
  avatarUrl,
  name,
  labels = [],
  lastMessage,
  timestamp,
  unreadCount,
}: ChatListItemProps) {
  const { selectChat } = useChatStore();

  const handleClick = () => {
    selectChat(id);
    // TODO: On mobile, also open the chat window view
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 ${active ? 'bg-green-50 dark:bg-green-950' : ''}`}
      onClick={handleClick}
    >
      {/* Avatar */}
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <FaUserCircle className="w-10 h-10 text-gray-300 dark:text-gray-700" />
      )}
      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-white truncate max-w-[120px]">{name}</span>
          {labels.map(label => (
            <span
              key={label.name}
              className={`text-xs font-semibold px-2 py-0.5 rounded ${label.color} bg-opacity-20`}
            >
              {label.name}
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
          {lastMessage}
        </div>
      </div>
      {/* Timestamp & Unread */}
      <div className="flex flex-col items-end gap-1 min-w-[48px]">
        <span className="text-xs text-gray-400 dark:text-gray-500">{timestamp}</span>
        {unreadCount ? (
          <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
            {unreadCount}
          </span>
        ) : null}
      </div>
    </div>
  );
} 