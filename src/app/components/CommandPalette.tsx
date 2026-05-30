import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, Briefcase, Mail, User, Code, MessageSquare, X, Keyboard } from 'lucide-react';

interface Command {
  id: string;
  title: string;
  icon: any;
  action: () => void;
  keywords: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    {
      id: 'home',
      title: 'Go to Home',
      icon: Home,
      action: () => scrollToSection('hero'),
      keywords: ['home', 'top', 'start'],
    },
    {
      id: 'about',
      title: 'Go to About',
      icon: User,
      action: () => scrollToSection('about'),
      keywords: ['about', 'bio', 'me'],
    },
    {
      id: 'services',
      title: 'Go to Services',
      icon: Briefcase,
      action: () => scrollToSection('services'),
      keywords: ['services', 'what', 'offer'],
    },
    {
      id: 'portfolio',
      title: 'Go to Portfolio',
      icon: Code,
      action: () => scrollToSection('portfolio'),
      keywords: ['portfolio', 'projects', 'work'],
    },
    {
      id: 'typing-challenge',
      title: 'Go to Typing Challenge',
      icon: Keyboard,
      action: () => scrollToSection('typing-challenge'),
      keywords: ['typing', 'challenge', 'speed', 'game', 'test'],
    },
    {
      id: 'testimonials',
      title: 'Go to Testimonials',
      icon: MessageSquare,
      action: () => scrollToSection('testimonials'),
      keywords: ['testimonials', 'reviews', 'feedback'],
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      icon: Mail,
      action: () => scrollToSection('contact'),
      keywords: ['contact', 'email', 'message'],
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.keywords.some((k) => k.includes(search.toLowerCase()))
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, selectedIndex, filteredCommands]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search commands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Commands List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No commands found</div>
            ) : (
              filteredCommands.map((cmd, index) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${
                      index === selectedIndex ? 'bg-gray-100 dark:bg-white/5' : ''
                    }`}
                  >
                    <div className="size-10 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center">
                      <Icon className="text-[#FF7A00]" size={20} />
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{cmd.title}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs text-gray-400">
            <div className="flex gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to open command palette
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return { isOpen, setIsOpen };
}
