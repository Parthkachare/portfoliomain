import { motion } from 'motion/react';
import { Code, Palette, Smartphone, Globe } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

export function SkillsComparison() {
  const skills: Skill[] = [
    { 
      name: 'UI/UX Design', 
      level: 95, 
      icon: <Palette className="size-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Frontend Development', 
      level: 90, 
      icon: <Code className="size-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Mobile Design', 
      level: 85, 
      icon: <Smartphone className="size-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Web3 & Blockchain', 
      level: 75, 
      icon: <Globe className="size-5" />,
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <h3 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Skills Overview
      </h3>

      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color} text-white`}>
                {skill.icon}
              </div>
              <span className="font-semibold dark:text-white">{skill.name}</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FEB273] bg-clip-text text-transparent">
              {skill.level}%
            </span>
          </div>

          {/* Progress bar background */}
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            {/* Animated progress bar */}
            <motion.div
              className={`h-full bg-gradient-to-r ${skill.color} relative`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
