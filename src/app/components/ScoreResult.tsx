import { motion } from 'motion/react';
import { Trophy, Clock, Star, TrendingUp } from 'lucide-react';

interface ScoreResultProps {
  score: number;
  time: number;
  onContinue: () => void;
}

export function ScoreResult({ score, time, onContinue }: ScoreResultProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-cyan-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! 🏆';
    if (score >= 70) return 'Great Job! 🎉';
    if (score >= 50) return 'Good Effort! 👏';
    return 'Keep Practicing! 💪';
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-black" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Results</h1>
          <p className="text-gray-400 font-mono">Challenge Completed!</p>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl w-full backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-3xl p-8 md:p-12 mb-8"
        >
          {/* Score display */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="mb-4"
            >
              <div className={`text-8xl md:text-9xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <p className="text-2xl text-gray-400 mt-2">{getScoreMessage(score)}</p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <Clock className="w-10 h-10 mx-auto mb-3 text-cyan-400" />
              <div className="text-3xl font-bold text-white mb-1">{formatTime(time)}</div>
              <p className="text-sm text-gray-400">Completion Time</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <Star className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
              <div className="text-3xl font-bold text-white mb-1">4/4</div>
              <p className="text-sm text-gray-400">Puzzles Solved</p>
            </motion.div>
          </div>

          {/* Leaderboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold">Calculating Your Rank</span>
            </div>
            <div className="text-4xl font-bold text-purple-400 mb-1">🎯</div>
            <p className="text-sm text-gray-400">Based on your score and time...</p>
          </motion.div>
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="group relative px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-xl font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300"
        >
          <span className="relative z-10">Claim Your Reward</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
        </motion.button>
      </div>
    </div>
  );
}