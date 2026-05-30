import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

const tips = [
  "Good design is invisible - it just works!",
  "White space is not wasted space.",
  "Consistency creates familiarity and trust.",
  "Design is not just what it looks like - it's how it works.",
  "Less is more - simplicity is the ultimate sophistication.",
  "Color evokes emotion - use it wisely!",
  "Typography can make or break a design.",
  "Mobile-first design is no longer optional.",
  "Accessibility is not a feature, it's a necessity.",
  "User research beats assumptions every time."
];

interface LoadingTipsProps {
  isLoading: boolean;
}

export function LoadingTips({ isLoading }: LoadingTipsProps) {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-gradient-to-br from-[#FF7A00] to-[#FEB273] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Logo animation */}
      <motion.div
        className="mb-12"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="text-8xl font-bold text-white">PK</div>
      </motion.div>

      {/* Loading spinner */}
      <motion.div
        className="size-16 border-4 border-white/30 border-t-white rounded-full mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />

      {/* Tips */}
      <div className="max-w-2xl px-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Lightbulb className="size-6 text-yellow-300" />
          <h3 className="text-xl font-semibold text-white">Design Tip</h3>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentTip}
            className="text-center text-2xl font-medium text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            "{tips[currentTip]}"
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {tips.map((_, index) => (
          <motion.div
            key={index}
            className={`size-2 rounded-full ${
              index === currentTip ? 'bg-white' : 'bg-white/30'
            }`}
            animate={{
              scale: index === currentTip ? 1.5 : 1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
