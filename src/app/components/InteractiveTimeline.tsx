import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Award, Rocket } from 'lucide-react';
import { useState } from 'react';

const timelineData = [
  {
    year: '2024',
    title: 'Senior UI/UX Designer',
    company: 'Tech Startup',
    description: 'Leading design initiatives for multiple products',
    icon: Rocket,
    color: '#FF7A00',
  },
  {
    year: '2023',
    title: 'UI/UX Designer',
    company: 'Digital Agency',
    description: 'Designed 20+ client projects',
    icon: Briefcase,
    color: '#FEB273',
  },
  {
    year: '2022',
    title: 'Design Award',
    company: 'International Recognition',
    description: 'Won Best Student Design Award',
    icon: Award,
    color: '#FFD700',
  },
  {
    year: '2021',
    title: 'Started CSE Journey',
    company: 'University',
    description: 'Began Computer Science Engineering studies',
    icon: GraduationCap,
    color: '#4ECDC4',
  },
];

export function InteractiveTimeline() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF7A00] to-[#FEB273]" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {timelineData.map((item, index) => {
          const Icon = item.icon;
          const isSelected = selectedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20 cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              {/* Icon */}
              <motion.div
                className="absolute left-0 size-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
                animate={{
                  scale: isSelected ? 1.1 : 1,
                  boxShadow: isSelected ? `0 0 30px ${item.color}` : 'none',
                }}
                whileHover={{ scale: 1.15 }}
              >
                <Icon size={28} style={{ color: item.color }} />
              </motion.div>

              {/* Content */}
              <motion.div
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border border-gray-200 dark:border-white/10 hover:border-[#FF7A00] dark:hover:border-[#FF7A00] transition-colors"
                animate={{
                  scale: isSelected ? 1.02 : 1,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[#FF7A00] font-bold text-sm">{item.year}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.company}</p>
                  </div>
                </div>
                <motion.p
                  className="text-gray-600 dark:text-gray-400"
                  animate={{
                    opacity: isSelected ? 1 : 0.7,
                  }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
