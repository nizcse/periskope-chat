"use client";
import { ReactNode } from "react";
import { useUIStore } from '@/stores/uiStore'
import { IoClose } from 'react-icons/io5'

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
};

export const Modal = () => {
  const { isModalOpen, modalContent, closeModal } = useUIStore()

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <IoClose size={24} />
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {modalContent || 'This feature is coming soon!'}
        </p>
      </div>
    </div>
  )
}
