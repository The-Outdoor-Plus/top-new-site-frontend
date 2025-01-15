"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  embedUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, embedUrl }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-[90vw] w-full">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <iframe
            src={embedUrl}
            width="100%"
            height="600px"
            allowFullScreen
            title={title}
            style={{ border: "none" }}
          />
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal; 