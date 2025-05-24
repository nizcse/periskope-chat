import { useAuthStore } from '@/stores/authStore';
import { FaUserCircle } from 'react-icons/fa';
import { FiCheckCircle, FiSend } from 'react-icons/fi';

interface SentMessageBubbleProps {
  senderName: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
  phoneNumber?: string;
  senderEmail?: string;
}

export default function SentMessageBubble({
  senderName,
  avatarUrl,
  content,
  timestamp,
  phoneNumber,
  senderEmail,
}: SentMessageBubbleProps) {
  const {user} = useAuthStore()
  return (
    <div className="flex w-full mb-2 justify-end">
      <div className="flex items-end gap-2 max-w-[75%] flex-row-reverse">
        {/* Avatar */}
        {/* <div className="w-8 h-8 rounded-full border-2 border-gray-700 bg-gray-800 flex items-center justify-center text-xs font-bold text-white">
          {avatarUrl ? (
            <img src={avatarUrl} alt={senderName} className="w-full h-full rounded-full object-cover" />
          ) : (
            senderName ? senderName[0] : 'U' // Fallback to 'U' if no name
          )}
        </div> */}
        {/* Message bubble content */}
        <div
          className="rounded-2xl px-4 py-2 text-sm shadow-md relative bg-green-100 text-gray-900 dark:bg-green-600 dark:text-white" // Sent message styling
          style={{ wordBreak: 'break-word' }}
        >
          {/* Sender name and phone (as seen in screenshot) */}
           <div className="flex items-center gap-1 mb-0.5">
            <span className="text-xs font-semibold text-green-700">{senderName}</span> 
            {phoneNumber && (
              <span className="text-xs text-gray-500">{phoneNumber}</span> 
            )}
          </div>

          {/* Message Content */}
          <div className="text-gray-900 dark:text-white">{content}</div> 

          {/* Footer (Email, Timestamp, Icons) */}
          <div className="flex items-center justify-end gap-2 mt-1 text-xs text-gray-500"> 
            
               <span className="text-[10px] text-gray-500"> 
                 <FiSend size={10} className="inline-block mr-0.5 text-gray-400" />{user?.email} 
               </span>
            
            <span className="text-[10px] text-gray-500">{(new Date(timestamp).toUTCString().slice(-11, -4))}</span> 
            <FiCheckCircle size={14} className="text-green-500" /> 
          </div>

        </div>
      </div>
    </div>
  );
} 