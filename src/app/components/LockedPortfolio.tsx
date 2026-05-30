import { motion } from 'motion/react';
import { Lock, FileText, User, Mail, Briefcase } from 'lucide-react';

interface LockedPortfolioProps {
  onStartPuzzle: () => void;
}

export function LockedPortfolio({ onStartPuzzle }: LockedPortfolioProps) {
  const sections = [
    { icon: Briefcase, title: 'Projects', description: '6 amazing projects' },
    { icon: FileText, title: 'Skills', description: 'Technical expertise' },
    { icon: User, title: 'About', description: 'Background & experience' },
    { icon: Mail, title: 'Contact', description: 'Get in touch' },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/3 right-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Lock icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative">
            <Lock className="w-24 h-24 text-red-500" />
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0"
            >
              <Lock className="w-24 h-24 text-red-500 opacity-50 blur-sm" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-center"
        >
          Portfolio Locked
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-400 mb-12 text-center font-mono"
        >
          Complete the challenges to gain access
        </motion.p>

        {/* Blurred sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl w-full"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden group"
            >
              {/* Lock overlay */}
              <div className="absolute inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center group-hover:backdrop-blur-lg transition-all">
                <Lock className="w-12 h-12 text-white/30" />
              </div>

              {/* Content (blurred) */}
              <div className="blur-sm">
                <section.icon className="w-12 h-12 mb-4 text-cyan-400" />
                <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                <p className="text-gray-400">{section.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartPuzzle}
          className="group relative px-10 py-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-full text-lg font-bold shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 transition-all duration-300"
        >
          <span className="relative z-10">Begin Challenges</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
        </motion.button>
      </div>
    </div>
  );
}
