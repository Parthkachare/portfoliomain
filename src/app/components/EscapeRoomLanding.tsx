import { motion } from 'motion/react';
import { Lock, Trophy, Zap, Code2 } from 'lucide-react';

interface EscapeRoomLandingProps {
  onStart: () => void;
}

export function EscapeRoomLanding({ onStart }: EscapeRoomLandingProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated code background */}
      <div className="absolute inset-0 opacity-10">
        <div className="font-mono text-xs text-cyan-400 leading-relaxed p-8">
          {`const unlockPortfolio = async () => {\n  const challenges = await getChallenges();\n  for (let challenge of challenges) {\n    const solved = await solve(challenge);\n    if (!solved) return false;\n  }\n  return true;\n};\n\nfunction decrypt(cipher, key) {\n  let result = '';\n  for (let char of cipher) {\n    result += shiftChar(char, key);\n  }\n  return result;\n}`}
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          {/* Title */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <Lock className="w-20 h-20 mx-auto mb-6 text-cyan-400" />
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Escape the Developer's Portfolio
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 font-mono"
          >
            Solve the challenges to unlock <span className="text-cyan-400">Parth's work</span>.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-6">
              <Code2 className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
              <h3 className="text-lg font-bold mb-2">Code Challenges</h3>
              <p className="text-sm text-gray-400">Fix bugs and decode ciphers</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-2xl p-6">
              <Zap className="w-12 h-12 mx-auto mb-3 text-purple-400" />
              <h3 className="text-lg font-bold mb-2">Logic Puzzles</h3>
              <p className="text-sm text-gray-400">Solve riddles and find hidden elements</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-pink-500/20 rounded-2xl p-6">
              <Trophy className="w-12 h-12 mx-auto mb-3 text-pink-400" />
              <h3 className="text-lg font-bold mb-2">Win Rewards</h3>
              <p className="text-sm text-gray-400">Top players get exclusive prizes</p>
            </div>
          </motion.div>

          {/* Start button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-xl font-bold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
          >
            <span className="relative z-10">Start Challenge</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
          </motion.button>

          {/* Leaderboard preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-sm text-gray-500 font-mono"
          >
            <p>🏆 Beat the top players and claim your reward!</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
