import { motion } from 'motion/react';
import { Briefcase, Sparkles } from 'lucide-react';

export function HireMeButton() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={scrollToContact}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 group"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative px-8 py-4 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FEB273] text-white font-bold text-lg shadow-2xl"
        animate={{ 
          boxShadow: [
            '0 20px 60px rgba(255, 122, 0, 0.4)',
            '0 20px 80px rgba(255, 122, 0, 0.6)',
            '0 20px 60px rgba(255, 122, 0, 0.4)',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(45deg, #FF7A00, #FEB273, #FF7A00)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3 bg-gradient-to-r from-[#FF7A00] to-[#FEB273] px-1 py-1 rounded-full">
          <Briefcase className="size-6" />
          <span>Hire Me</span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <Sparkles className="size-5" />
          </motion.div>
        </div>

        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#FF7A00]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.button>
  );
}
