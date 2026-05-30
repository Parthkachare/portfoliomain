import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Keyboard } from 'lucide-react';

const shortcuts = [
  { keys: ['⌘', 'K'], description: 'Open command palette' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
  { keys: ['H'], description: 'Go to home' },
  { keys: ['A'], description: 'Go to about' },
  { keys: ['P'], description: 'Go to portfolio' },
  { keys: ['C'], description: 'Go to contact' },
  { keys: ['D'], description: 'Toggle dark mode' },
  { keys: ['ESC'], description: 'Close modal' },
  { keys: ['↑', '↓'], description: 'Navigate items' },
  { keys: ['↵'], description: 'Select item' },
];

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.shiftKey) {
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 size-12 rounded-full bg-white dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 transition-colors z-50 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Keyboard shortcuts (?)"
      >
        <Keyboard size={20} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center">
                    <Keyboard className="text-[#FF7A00]" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Keyboard Shortcuts
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Shortcuts List */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid gap-3">
                  {shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {shortcut.description}
                      </span>
                      <div className="flex gap-2">
                        {shortcut.keys.map((key, i) => (
                          <kbd
                            key={i}
                            className="px-3 py-1.5 bg-white dark:bg-[#0C0C0C] border border-gray-300 dark:border-white/20 rounded-lg text-sm font-mono text-gray-900 dark:text-white shadow-sm"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-white/10 text-center text-sm text-gray-500">
                Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-white/10 rounded">?</kbd> to
                toggle this panel
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}