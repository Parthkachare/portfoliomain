import { motion } from 'motion/react';
import { Github } from 'lucide-react';

export function GitHubContributions() {
  // Generate mock contribution data
  const weeks = 52;
  const daysPerWeek = 7;
  
  const getContributionLevel = () => {
    const random = Math.random();
    if (random > 0.8) return 4;
    if (random > 0.6) return 3;
    if (random > 0.4) return 2;
    if (random > 0.2) return 1;
    return 0;
  };

  const getColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-200 dark:bg-gray-800';
      case 1: return 'bg-[#FFE5CC]';
      case 2: return 'bg-[#FFB366]';
      case 3: return 'bg-[#FF9933]';
      case 4: return 'bg-[#FF7A00]';
      default: return 'bg-gray-200';
    }
  };

  const contributions = Array.from({ length: weeks }, () =>
    Array.from({ length: daysPerWeek }, () => getContributionLevel())
  );

  const totalContributions = contributions.flat().reduce((a, b) => a + b, 0) * 10;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Github className="size-8 text-[#FF7A00]" />
          <div>
            <h3 className="text-2xl font-bold dark:text-white">GitHub Activity</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {totalContributions} contributions in the last year
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="inline-flex gap-1">
          {contributions.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((level, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`size-3 rounded-sm ${getColor(level)}`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                  whileHover={{ scale: 1.5 }}
                  title={`${level * 10} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`size-3 rounded-sm ${getColor(level)}`} />
          ))}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">More</span>
      </div>
    </div>
  );
}
