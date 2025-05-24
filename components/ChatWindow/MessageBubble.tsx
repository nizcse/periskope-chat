
import { FiCheckCircle, FiSend } from 'react-icons/fi';

interface MessageBubbleProps {
  isOwn?: boolean;
  senderName: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
  phoneNumber?: string;
  senderEmail?: string;
}

export default function MessageBubble({
  isOwn = false,
  senderName,
  avatarUrl,
  content,
  timestamp,
  phoneNumber,
  senderEmail,
}: MessageBubbleProps) {
  return (
    <div className={`flex w-full mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-2 max-w-[75%] ${isOwn ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${isOwn ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white'}`}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={senderName} className="w-full h-full rounded-full object-cover" />
          ) : (
            senderName ? senderName[0] : 'U'
          )}
        </div>
        <div>
          {/* Sender name and phone (if not own) */}
          {!isOwn && (
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-xs font-semibold text-green-700 dark:text-green-400">{senderName}</span>
              {phoneNumber && (
                <span className="text-xs text-gray-400 dark:text-gray-500">{phoneNumber}</span>
              )}
            </div>
          )}
          {/* Message bubble */}
          <div
            className={`rounded-2xl px-4 py-2 text-sm shadow-md relative ${
              isOwn
                ? 'bg-green-100 text-gray-900 dark:bg-green-600 dark:text-white'
                : 'bg-white text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700'
            }`}
            style={{ wordBreak: 'break-word' }}
          >
            {/* Sender name and phone (only for own messages, as seen in screenshot) */}
            {isOwn && (
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-xs font-semibold text-green-700">{senderName}</span>
                {phoneNumber && (
                  <span className="text-xs text-gray-500">{phoneNumber}</span>
                )}
              </div>
            )}

            {/* Message Content */}
            <div className="text-gray-900 dark:text-white">{content}</div>

            {/* Footer (Email, Timestamp, Icons) */}
            {isOwn && (
              <div className="flex items-center justify-end gap-2 mt-1 text-xs text-gray-500">
                {senderEmail && (
                  <span className="text-[10px] text-gray-500">
                    <FiSend size={10} className="inline-block mr-0.5 text-gray-400" />{senderEmail}
                  </span>
                )}
                <span className="text-[10px] text-gray-500">{timestamp}</span>
                <FiCheckCircle size={14} className="text-green-500" />
              </div>
            )}

            {/* Timestamp for received messages (old position) */}
            {!isOwn && (
              <span className="ml-2 text-[10px] text-gray-400 dark:text-gray-300 select-none align-bottom">
                {timestamp}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 