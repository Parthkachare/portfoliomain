import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setShowPlayer(!showPlayer)}
        className="fixed bottom-40 left-8 z-50 size-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FEB273] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Background Music"
      >
        <Music size={20} />
      </motion.button>

      <AnimatePresence>
        {showPlayer && (
          <motion.div
            className="fixed bottom-56 left-8 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <motion.div
                className="size-12 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FEB273] flex items-center justify-center"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
              >
                <Music className="size-6 text-white" />
              </motion.div>
              <div>
                <p className="font-semibold dark:text-white">Lofi Beats</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Background Music</p>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FEB273] text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </motion.button>

              <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </motion.button>
            </div>

            {isPlaying && (
              <div className="mt-3 flex gap-1 justify-center">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#FF7A00] rounded-full"
                    animate={{ height: ['8px', '24px', '8px'] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
