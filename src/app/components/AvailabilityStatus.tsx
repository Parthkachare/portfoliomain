import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface AvailabilityStatusProps {
  available?: boolean;
  message?: string;
}

export function AvailabilityStatus({ 
  available = true, 
  message = 'Available for freelance work' 
}: AvailabilityStatusProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`size-3 rounded-full ${available ? 'bg-green-500' : 'bg-red-500'}`} />
        <motion.div
          className={`absolute inset-0 rounded-full ${available ? 'bg-green-500' : 'bg-red-500'}`}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <span className="text-sm font-medium dark:text-white">{message}</span>
      {available && <CheckCircle2 className="size-4 text-green-500" />}
    </motion.div>
  );
}
