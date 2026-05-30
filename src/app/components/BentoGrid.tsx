import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

function BentoItem({ children, className = '', gradient = false }: BentoItemProps) {
  return (
    <motion.div
      className={`rounded-3xl p-6 ${
        gradient 
          ? 'bg-gradient-to-br from-[#FF7A00] to-[#FEB273] text-white' 
          : 'bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/20'
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
      {/* Large featured item */}
      <BentoItem className="md:col-span-2 md:row-span-2" gradient>
        <div className="h-full flex flex-col justify-between">
          <h3 className="text-3xl font-bold">10+ Years Experience</h3>
          <p className="text-white/90">
            Crafting exceptional digital experiences for startups and enterprises worldwide
          </p>
        </div>
      </BentoItem>

      {/* Stats */}
      <BentoItem className="flex flex-col justify-center items-center text-center">
        <div className="text-5xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FEB273] bg-clip-text text-transparent">
          150+
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Projects Completed</p>
      </BentoItem>

      <BentoItem className="flex flex-col justify-center items-center text-center">
        <div className="text-5xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FEB273] bg-clip-text text-transparent">
          50+
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Happy Clients</p>
      </BentoItem>

      {/* Skills highlight */}
      <BentoItem className="md:col-span-2">
        <h4 className="font-bold text-xl mb-3 dark:text-white">Top Skills</h4>
        <div className="flex flex-wrap gap-2">
          {['UI/UX Design', 'React', 'Figma', 'Webflow', 'Framer'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-[#FF7A00]/20 text-[#FF7A00] text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </BentoItem>

      {/* Availability */}
      <BentoItem className="flex items-center justify-center" gradient>
        <div className="text-center">
          <div className="size-4 bg-green-400 rounded-full mx-auto mb-2 animate-pulse" />
          <p className="font-semibold">Available for Work</p>
        </div>
      </BentoItem>

      {/* Awards */}
      <BentoItem>
        <h4 className="font-bold text-lg mb-2 dark:text-white">🏆 Awards</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          5x Awwwards Winner
        </p>
      </BentoItem>
    </div>
  );
}
