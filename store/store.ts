import { create } from 'zustand';

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (value: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (value: boolean) => void;

    fileId: string | null;
    setFileId: (value: string) => void;

    filename: string;
    setFilename: (value: string) => void;

}

export const useAppStore = create<AppState>((set) => ({
    fileId: null,
    setFileId: (fileId: string) => set((state) => ({ fileId })),

    filename: '',
    setFilename: (filename: string) => set((state) => ({ filename })),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open) => set((state) => ({ isRenameModalOpen: open })),
}))