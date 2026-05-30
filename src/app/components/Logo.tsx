import { motion } from 'motion/react';
import logoImage from 'figma:asset/ecbe4dbb70e0f6db1675fbb8005cdadbdf06b2ec.png';

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function Logo({ size = 48, animated = false, className = '' }: LogoProps) {
  return (
    <motion.div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      whileHover={animated ? { scale: 1.05, rotate: 3 } : {}}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={logoImage} 
        alt="PK Logo" 
        className="w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 0 10px rgba(120, 220, 255, 0.3))' }}
      />
    </motion.div>
  );
}

// Simple version for smaller sizes
export function LogoSimple({ size = 32, className = '' }: LogoProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src={logoImage} 
        alt="PK Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}