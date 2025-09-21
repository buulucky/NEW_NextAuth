"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type ModalContextType = {
  openModal: (content: ReactNode, title: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const openModal = (c: ReactNode, t: string) => {
    setContent(c);
    setTitle(t);
  };

  const closeModal = () => {
    setContent(null);
    setTitle(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Dialog open={!!content} onOpenChange={closeModal}>
        {content && (
          <DialogContent>
            <DialogTitle>{title}</DialogTitle>
            {content}
          </DialogContent>
        )}
      </Dialog>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal ต้องใช้ภายใน <ModalProvider>");
  return ctx;
}
