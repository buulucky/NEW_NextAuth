"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type ModalContextType = {
  openModal: (content: ReactNode, title: string, description?: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const openModal = (c: ReactNode, t: string, d?: string) => {
    setContent(c);
    setTitle(t);
    setDescription(d || null);
  };

  const closeModal = () => {
    setContent(null);
    setTitle(null);
    setDescription(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Dialog open={!!content} onOpenChange={closeModal}>
        {content && (
          <DialogContent className="!max-w-2xl">
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
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
