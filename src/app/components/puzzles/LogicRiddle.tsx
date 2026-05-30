import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain, Send } from 'lucide-react';
import { toast } from 'sonner';

interface LogicRiddleProps {
  onComplete: () => void;
}

const riddles = [
  {
    question: "I speak without a mouth and hear without ears. What am I?",
    answers: ['echo', 'an echo'],
    hint: "Think about something that repeats what you say but has no physical form."
  },
  {
    question: "What has keys but no locks, space but no room, and you can enter but can't go inside?",
    answers: ['keyboard', 'a keyboard'],
    hint: "It's something you're using right now to solve this puzzle."
  },
  {
    question: "I am always running but never get tired. What am I?",
    answers: ['code', 'program', 'a program', 'computer program'],
    hint: "Think about what developers create that executes continuously."
  },
  {
    question: "What starts with E, ends with E, but only contains one letter?",
    answers: ['envelope', 'an envelope'],
    hint: "Think literally - what can contain a single letter?"
  },
  {
    question: "I have branches, but no fruit, trunk, or leaves. What am I?",
    answers: ['bank', 'a bank', 'git', 'repository', 'git repository'],
    hint: "Think about version control or finance."
  },
  {
    question: "What can travel around the world while staying in a corner?",
    answers: ['stamp', 'a stamp', 'postage stamp'],
    hint: "Think about mail and letters."
  },
];

export function LogicRiddle({ onComplete }: LogicRiddleProps) {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentRiddle, setCurrentRiddle] = useState(riddles[0]);

  useEffect(() => {
    const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];
    setCurrentRiddle(randomRiddle);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userAnswer = answer.trim().toLowerCase();
    
    if (currentRiddle.answers.includes(userAnswer)) {
      toast.success('Correct! 🎉');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      toast.error('Not quite. Think about sound...');
      setIsSubmitting(false);
      setAnswer('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-950 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-pink-400" />
            <h2 className="text-3xl md:text-5xl font-bold">Puzzle 3</h2>
          </div>
          <p className="text-xl text-gray-400 font-mono">Logic Riddle</p>
        </motion.div>

        {/* Riddle Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl w-full backdrop-blur-md bg-white/5 border border-pink-500/20 rounded-3xl p-8 md:p-12"
        >
          {/* Riddle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="text-center mb-8">
              <div className="text-6xl md:text-8xl mb-6">🤔</div>
              <p className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed">
                "{currentRiddle.question}"
              </p>
            </div>
          </motion.div>

          {/* Answer Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                Your Answer
              </label>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer..."
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-black/50 border border-pink-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !answer.trim()}
              className="group w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span>Submit Answer</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>

          {/* Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-6 p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg"
          >
            <p className="text-sm text-gray-400">
              <span className="text-pink-400 font-semibold">Hint:</span> {currentRiddle.hint}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}