import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function DarkModeToggle({ darkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed bottom-24 left-8 z-50 size-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FEB273] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-white/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </motion.button>
  );
}