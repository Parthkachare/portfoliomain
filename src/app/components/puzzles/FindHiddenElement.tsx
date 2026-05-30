import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FindHiddenElementProps {
  onComplete: () => void;
}

export function FindHiddenElement({ onComplete }: FindHiddenElementProps) {
  const [found, setFound] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctPosition, setCorrectPosition] = useState(2);

  // Randomize the position of the hidden element on mount
  useEffect(() => {
    setCorrectPosition(Math.floor(Math.random() * 8));
  }, []);

  const handleClick = (position: number) => {
    setAttempts(prev => prev + 1);
    
    if (position === correctPosition) {
      setFound(true);
      toast.success('Access key found! 🔑');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      toast.error('Not the access key. Keep looking!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl md:text-5xl font-bold">Puzzle 1</h2>
          </div>
          <p className="text-xl text-gray-400 font-mono">Find the hidden access key</p>
          <p className="text-sm text-gray-500 mt-2">Attempts: {attempts}</p>
        </motion.div>

        {/* Dashboard UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl w-full backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-3xl p-8 md:p-12"
        >
          {/* Grid of UI elements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((position) => (
              <div
                key={position}
                onClick={() => handleClick(position)}
                className={`backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:scale-105 transition-all group relative ${
                  position === correctPosition
                    ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 hover:bg-cyan-500/20'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                {position === correctPosition && (
                  <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-60 transition-opacity">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  </div>
                )}
                <div className={`w-full h-24 rounded-lg mb-3 flex items-center justify-center ${
                  position === correctPosition
                    ? 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30'
                    : position % 8 === 0
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                    : position % 8 === 1
                    ? 'bg-gradient-to-br from-green-500/20 to-teal-500/20'
                    : position % 8 === 3
                    ? 'bg-gradient-to-br from-pink-500/20 to-red-500/20'
                    : position % 8 === 4
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
                    : position % 8 === 5
                    ? 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20'
                    : position % 8 === 6
                    ? 'bg-gradient-to-br from-rose-500/20 to-pink-500/20'
                    : 'bg-gradient-to-br from-lime-500/20 to-green-500/20'
                }`}>
                  {position === correctPosition && (
                    <div className="font-mono text-xs text-cyan-300 opacity-40">ACCESS_KEY</div>
                  )}
                </div>
                <div className={`h-3 rounded mb-2 ${
                  position === correctPosition ? 'bg-cyan-400/20' : 'bg-white/20'
                }`} />
                <div className={`h-3 rounded ${
                  position === correctPosition 
                    ? 'bg-cyan-400/10 w-1/2' 
                    : position % 3 === 0 
                    ? 'bg-white/10 w-2/3' 
                    : 'bg-white/10 w-3/4'
                }`} />
              </div>
            ))}
          </div>

          {/* Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <span className="text-cyan-400 font-semibold">Hint:</span> Look for something different. The access key has a subtle cyan glow and pulses gently.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}