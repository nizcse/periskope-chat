import { FaUserCircle } from 'react-icons/fa';

interface ReceivedMessageBubbleProps {
  senderName: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
  phoneNumber?: string;
}

export default function ReceivedMessageBubble({
  senderName,
  avatarUrl,
  content,
  timestamp,
  phoneNumber,
}: ReceivedMessageBubbleProps) {
  return (
    <div className="flex w-full mb-2 justify-start">
      <div className="flex  gap-2 max-w-[75%]">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full border-2 border-gray-200 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white flex items-center justify-center text-xs font-bold">
          {avatarUrl ? (
            <img src={avatarUrl} alt={senderName} className="w-full h-full rounded-full object-cover" />
          ) : (
            senderName ? senderName[0] : 'U' // Fallback to 'U' if no name
          )}
        </div>
        {/* Message bubble content */}
        <div
          className="rounded-2xl px-4 py-2 text-sm shadow-md relative bg-white text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 pr-12" // Added pr-12 to make space for timestamp
          style={{ wordBreak: 'break-word' }}
        >
          {/* Sender name and phone */}
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">{senderName}</span>
            {phoneNumber && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{phoneNumber}</span>
            )}
          </div>

          {/* Message Content */}
          <div className="text-gray-900 dark:text-white mt-2 mb-2">{content}</div>

          {/* Timestamp (Absolutely positioned) */}
          <span className="absolute bottom-1 right-2 text-[10px] text-gray-400 dark:text-gray-300 select-none">
            {(new Date(timestamp).toUTCString().slice(-11, -4))}
          </span>
        </div>
      </div>
    </div>
  );
} 