// components/CreateChatModal.tsx
import React, { useState } from 'react';
import { useChatStore } from '@/stores/chatStore';

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateChatModal({ isOpen, onClose }: CreateChatModalProps) {
  const [chatName, setChatName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { createChat, loading } = useChatStore();

  if (!isOpen) return null;

  const handleAddParticipant = () => {
    if (!participantEmail) return;
    if (participants.includes(participantEmail)) {
      setError('This email is already added');
      return;
    }
    setParticipants([...participants, participantEmail]);
    setParticipantEmail('');
    setError(null);
  };

  const handleRemoveParticipant = (email: string) => {
    setParticipants(participants.filter(p => p !== email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatName.trim()) {
      setError('Please enter a chat name');
      return;
    }

    try {
      await createChat(chatName, participants);
      onClose();
      // Reset form
      setChatName('');
      setParticipants([]);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Chat</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="chatName">
              Chat Name
            </label>
            <input
              type="text"
              id="chatName"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter chat name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="participantEmail">
              Add Participants
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                id="participantEmail"
                value={participantEmail}
                onChange={(e) => setParticipantEmail(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter email address"
              />
              <button
                type="button"
                onClick={handleAddParticipant}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
          </div>

          {participants.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Participants:</h3>
              <div className="space-y-2">
                {participants.map((email) => (
                  <div key={email} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    <span className="text-gray-700 dark:text-gray-300">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveParticipant(email)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Chat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}