import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  modalContent: string | null;
  isModalOpen: boolean;
  isChatWindowOpen: boolean;
  toggleSidebar: () => void;
  openModal: (content: string) => void;
  closeModal: () => void;
  openChatWindow: () => void;
  closeChatWindow: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  modalContent: null,
  isModalOpen: false,
  isChatWindowOpen: false,
  toggleSidebar: () => set((state) => ({ 
    isSidebarOpen: !state.isSidebarOpen 
  })),
  openModal: (content) => set({ 
    modalContent: content, 
    isModalOpen: true 
  }),
  closeModal: () => set({ 
    modalContent: null, 
    isModalOpen: false 
  }),
  openChatWindow: () => set({ isChatWindowOpen: true }),
  closeChatWindow: () => set({ isChatWindowOpen: false }),
}));
