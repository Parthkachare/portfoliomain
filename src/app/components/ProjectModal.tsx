import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: string;
  challenge: string;
  solution: string;
  results: string[];
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          className="relative bg-white dark:bg-[#171717] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header Image */}
          <div className="aspect-video w-full overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#FF7A00]/10 text-[#FF7A00] rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              {project.longDescription}
            </p>

            {/* Challenge */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                The Challenge
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                The Solution
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {project.solution}
              </p>
            </div>

            {/* Results */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Results
              </h3>
              <ul className="space-y-2">
                {project.results.map((result, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-[#FF7A00] mt-1">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button className="flex-1 bg-[#FF7A00] hover:bg-[#FF7A00]/90 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                <ExternalLink size={18} />
                View Live
              </button>
              <button className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                <Github size={18} />
                View Code
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
