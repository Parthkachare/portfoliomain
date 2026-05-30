import { motion } from 'motion/react';
import { Gift, Award, Percent, Share2 } from 'lucide-react';

interface RewardScreenProps {
  rank: number;
  onClaimReward: () => void;
  onShare: () => void;
}

export function RewardScreen({ rank, onClaimReward, onShare }: RewardScreenProps) {
  const getReward = (rank: number) => {
    if (rank <= 3) {
      return {
        title: 'Free UI/UX Consultation',
        description: '1-hour session to discuss your project',
        icon: Award,
        color: 'from-yellow-500 to-orange-600',
        badgeColor: 'text-yellow-400',
      };
    } else if (rank <= 10) {
      return {
        title: '20% Project Discount',
        description: 'On your next web or mobile project',
        icon: Percent,
        color: 'from-cyan-500 to-blue-600',
        badgeColor: 'text-cyan-400',
      };
    } else {
      return {
        title: 'Priority Contact',
        description: 'Get faster response to your inquiries',
        icon: Gift,
        color: 'from-purple-500 to-pink-600',
        badgeColor: 'text-purple-400',
      };
    }
  };

  const reward = getReward(rank);
  const RewardIcon = reward.icon;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-orange-950 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] animate-pulse" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1 }}
            className="mb-6"
          >
            <Gift className="w-24 h-24 mx-auto text-orange-400" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">🎉 Congratulations!</h1>
          <p className="text-xl text-gray-400">You've earned a reward</p>
        </motion.div>

        {/* Reward card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl w-full backdrop-blur-md bg-white/5 border border-orange-500/20 rounded-3xl p-8 md:p-12 mb-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="flex justify-center mb-8"
          >
            <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${reward.color} rounded-full shadow-lg`}>
              <RewardIcon className="w-6 h-6" />
              <span className="font-bold text-lg">Rank #{rank}</span>
            </div>
          </motion.div>

          {/* Reward details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-8"
          >
            <RewardIcon className={`w-20 h-20 mx-auto mb-6 ${reward.badgeColor}`} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{reward.title}</h2>
            <p className="text-xl text-gray-400">{reward.description}</p>
          </motion.div>

          {/* How to claim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
          >
            <h3 className="font-semibold mb-4 text-lg">How to Claim:</h3>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-sm font-bold text-orange-400">1</span>
                <span>Fill out the reward claim form</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-sm font-bold text-orange-400">2</span>
                <span>Provide your contact information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-sm font-bold text-orange-400">3</span>
                <span>Parth will reach out within 48 hours</span>
              </li>
            </ol>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="space-y-4"
          >
            <button
              onClick={onClaimReward}
              className="group w-full relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-lg font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300"
            >
              <span className="relative z-10">Claim Your Reward</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
            </button>

            <button
              onClick={onShare}
              className="w-full px-8 py-4 bg-white/5 border border-white/20 hover:bg-white/10 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Results First</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
