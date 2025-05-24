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
  last_message?: {
    content: string;
    id: string;
    email: string;
    name: string | null;
    avatarUrl: string | null;
    last_updated :DateConstructor;
  };
  timestamp?: string;
  unreadCount?: number;
  phoneNumber?: string;
  lastMessageSenderAvatarUrl?: string;
}

export default function ChatListItem({
  id,
  active,
  avatarUrl,
  name,
  labels = [],
  last_message,
  timestamp,
  unreadCount,
  phoneNumber,
  lastMessageSenderAvatarUrl,
}: ChatListItemProps) {
  const { selectChat } = useChatStore();

  const handleClick = () => {
    selectChat(id);
    // TODO: On mobile, also open the chat window view
  };
console.log(last_message,id,'lastMessage')
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 ${active ? 'bg-green-50 dark:bg-green-950' : ''}`}
      onClick={handleClick}
    >
      {/* Avatar */}
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <FaUserCircle className="w-10 h-10 text-gray-300 dark:text-gray-700" />
      )}
      {/* Content to the right of the avatar */}
      <div className="flex flex-col flex-1 min-w-0 gap-y-1">
        {/* Top Row: Name and Tags */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-gray-900 dark:text-white truncate max-w-[120px]">{name}</span>
          <div className="flex items-center gap-1">
            {labels.map(label => (
              <span
                key={label.name}
                className={`text-xs font-semibold px-2 py-0.5 rounded ${label.color} bg-opacity-20`}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>
        {/* Middle Row: Last Message and Unread Count */}
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
            {`${last_message?.name}: ${last_message?.content}`}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount ? (
              <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            ) : null}
            {/* Last Message Sender Avatar */}
            {last_message?.avatarUrl ? (
              <img src={last_message?.avatarUrl} alt="Sender Avatar" className="w-4 h-4 rounded-full object-cover" />
            ) : (
               <FaUserCircle className="w-4 h-4 text-gray-300 dark:text-gray-700" />
            )}
          </div>
        </div>
        {/* Bottom Row: Phone Number and Timestamp */}
        <div className="flex items-center justify-between gap-2">
           <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
             {last_message?.email}
           </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(last_message?.last_updated).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
} 