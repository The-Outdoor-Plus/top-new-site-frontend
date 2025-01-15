'use client';

import { useState } from 'react';
import TopBar from './TopBar';
import MainBar from './MainBar';
import MobileMenu from './MobileMenu';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeader } from '@/context/HeaderContext';

export default function Header() {
  const { isScrollingUp, isAtTop } = useScrollDirection();
  const { isAnyDropdownOpen } = useHeader();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Show the bars if we're scrolling up, at the top, or any dropdown is open
  const shouldShowBars = isScrollingUp || isAtTop || isAnyDropdownOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <AnimatePresence>
        {shouldShowBars && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white"
          >
            <TopBar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white shadow-sm">
        <MainBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      </div>

      {/* <AnimatePresence>
        {shouldShowBars && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white"
          >
            <NavigationBar />
          </motion.div>
        )}
      </AnimatePresence> */}
      
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}