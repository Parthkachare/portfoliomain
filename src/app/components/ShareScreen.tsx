import { motion } from 'motion/react';
import { Share2, Linkedin, MessageCircle, Link2, Home } from 'lucide-react';
import { toast } from 'sonner';

interface ShareScreenProps {
  score: number;
  time: number;
}

export function ShareScreen({ score, time }: ShareScreenProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const shareText = `I just completed Parth Kachare's Developer Portfolio Escape Challenge! 🎮\n\nMy Score: ${score}/100\nTime: ${formatTime(time)}\n\nThink you can beat me? Try it now:`;
  const shareUrl = window.location.origin + '/escape';

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
    window.open(linkedInUrl, '_blank');
    toast.success('Opening LinkedIn...');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard! 📋');
  };

  const handleGoHome = () => {
    window.location.replace('/');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-teal-950 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-[128px]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Share2 className="w-20 h-20 mx-auto mb-6 text-teal-400" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Share Your Achievement!</h1>
          <p className="text-xl text-gray-400">Challenge your friends to beat your score</p>
        </motion.div>

        {/* Share options */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl w-full backdrop-blur-md bg-white/5 border border-teal-500/20 rounded-3xl p-8 md:p-12 mb-8"
        >
          {/* Score summary */}
          <div className="text-center mb-8 pb-8 border-b border-white/10">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-bold text-teal-400 mb-1">{score}</div>
                <p className="text-sm text-gray-400">Your Score</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-1">{formatTime(time)}</div>
                <p className="text-sm text-gray-400">Completion Time</p>
              </div>
            </div>
          </div>

          {/* Share buttons */}
          <div className="space-y-4 mb-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={handleLinkedInShare}
              className="group w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Linkedin className="w-5 h-5" />
              <span>Share on LinkedIn</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onClick={handleWhatsAppShare}
              className="group w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Share on WhatsApp</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              onClick={handleCopyLink}
              className="group w-full px-6 py-4 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Link2 className="w-5 h-5" />
              <span>Copy Challenge Link</span>
            </motion.button>
          </div>

          {/* Preview message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-black/50 border border-teal-500/30 rounded-xl p-6"
          >
            <p className="text-sm text-gray-400 mb-2">Share message preview:</p>
            <p className="text-gray-300 text-sm italic">
              "{shareText}"
            </p>
          </motion.div>
        </motion.div>

        {/* Back to portfolio button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={handleGoHome}
          className="group px-12 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 rounded-full text-lg font-bold shadow-2xl shadow-teal-500/50 hover:shadow-teal-500/70 transition-all duration-300 flex items-center gap-3"
        >
          <Home className="w-5 h-5" />
          <span>Explore Portfolio</span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-gray-500 text-sm"
        >
          Thanks for playing! 🎮
        </motion.p>
      </div>
    </div>
  );
}