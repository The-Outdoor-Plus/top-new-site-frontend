'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  isAnyDropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false);

  const setDropdownOpen = (isOpen: boolean) => {
    setIsAnyDropdownOpen(isOpen);
  };

  return (
    <HeaderContext.Provider value={{ isAnyDropdownOpen, setDropdownOpen }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
