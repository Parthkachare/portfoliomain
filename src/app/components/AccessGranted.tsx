import { motion } from 'motion/react';
import { Unlock, Check, Briefcase, FileText, User, Mail } from 'lucide-react';

interface AccessGrantedProps {
  onContinue: () => void;
}

export function AccessGranted({ onContinue }: AccessGrantedProps) {
  const unlockedSections = [
    { icon: Briefcase, title: 'Projects', color: 'cyan' },
    { icon: FileText, title: 'Skills', color: 'purple' },
    { icon: User, title: 'About', color: 'pink' },
    { icon: Mail, title: 'Contact', color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Success background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Unlock animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="mb-8"
        >
          <Unlock className="w-32 h-32 text-green-400" />
        </motion.div>

        {/* Success message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            ACCESS GRANTED
          </h1>
          <p className="text-xl text-gray-400 font-mono">
            Congratulations! You've unlocked the portfolio
          </p>
        </motion.div>

        {/* Unlocked sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl w-full"
        >
          {unlockedSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, type: 'spring' }}
              className={`backdrop-blur-md bg-white/5 border-2 border-${section.color}-500/50 rounded-2xl p-6 text-center relative overflow-hidden`}
            >
              {/* Success checkmark */}
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>

              <section.icon className={`w-12 h-12 mx-auto mb-3 text-${section.color}-400`} />
              <h3 className="font-bold text-lg">{section.title}</h3>
              <p className="text-xs text-green-400 mt-2">Unlocked ✓</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="group relative px-12 py-5 bg-gradient-to-r from-green-500 to-cyan-600 rounded-full text-xl font-bold shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300"
        >
          <span className="relative z-10">View Results</span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
        </motion.button>
      </div>
    </div>
  );
}
