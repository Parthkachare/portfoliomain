import { motion } from 'motion/react';
import { Code, Figma as FigmaIcon, Smartphone, Globe, Database, Zap } from 'lucide-react';

const tools = [
  { name: 'Figma', icon: FigmaIcon, color: '#F24E1E' },
  { name: 'React', icon: Code, color: '#61DAFB' },
  { name: 'TypeScript', icon: Code, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: Zap, color: '#06B6D4' },
  { name: 'Node.js', icon: Database, color: '#339933' },
  { name: 'Next.js', icon: Globe, color: '#000000' },
  { name: 'React Native', icon: Smartphone, color: '#61DAFB' },
  { name: 'MongoDB', icon: Database, color: '#47A248' },
];

export function ToolsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {tools.map((tool, index) => {
        const Icon = tool.icon;
        return (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="bg-white dark:bg-[#171717] rounded-2xl p-6 flex flex-col items-center gap-3 border border-gray-200 dark:border-white/10 hover:border-[#FF7A00] dark:hover:border-[#FF7A00] transition-colors"
          >
            <div
              className="size-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${tool.color}20` }}
            >
              <Icon size={24} style={{ color: tool.color }} />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">{tool.name}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
