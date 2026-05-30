import { motion } from 'motion/react';

const clients = [
  { name: 'TechStart', logo: 'https://via.placeholder.com/120x40/FF7A00/FFFFFF?text=TechStart' },
  { name: 'InnovateCo', logo: 'https://via.placeholder.com/120x40/FEB273/FFFFFF?text=InnovateCo' },
  { name: 'DesignHub', logo: 'https://via.placeholder.com/120x40/FF7A00/FFFFFF?text=DesignHub' },
  { name: 'StartupX', logo: 'https://via.placeholder.com/120x40/FEB273/FFFFFF?text=StartupX' },
  { name: 'DevCorp', logo: 'https://via.placeholder.com/120x40/FF7A00/FFFFFF?text=DevCorp' },
  { name: 'CloudTech', logo: 'https://via.placeholder.com/120x40/FEB273/FFFFFF?text=CloudTech' },
];

export function ClientLogos() {
  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-12 items-center"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...clients, ...clients].map((client, index) => (
          <div
            key={index}
            className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
          >
            <img src={client.logo} alt={client.name} className="h-10" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
