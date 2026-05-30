import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Trophy, Keyboard, RefreshCw, CheckCircle, XCircle, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const CODE_SNIPPETS = [
  'console.log("Hello World")',
  'const greeting = "Welcome!"',
  'function sum(a, b) { return a + b; }',
  'array.map(item => item * 2)',
  'if (isValid) { return true; }',
  'const [count, setCount] = useState(0)',
  'async function fetchData() { }',
  'export default function App() { }',
];

interface LeaderboardEntry {
  name: string;
  time: number;
  accuracy: number;
  snippet: string;
  timestamp: number;
}

export function TypingSpeedChallenge() {
  const [currentSnippet, setCurrentSnippet] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    selectRandomSnippet();
    fetchLeaderboard();
  }, []);

  const selectRandomSnippet = () => {
    const randomSnippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
    setCurrentSnippet(randomSnippet);
  };

  const fetchLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    setLeaderboardError(false);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-15ed28e0/leaderboard`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Filter out any null or invalid entries just in case
        const validEntries = (data.leaderboard || []).filter(
          (entry: LeaderboardEntry) => entry && entry.name && entry.time !== undefined
        );
        setLeaderboard(validEntries);
        setLeaderboardError(false);
      } else {
        // Server error - don't spam console with full HTML error pages
        setLeaderboardError(true);
      }
    } catch (error) {
      // Network or server error - handled gracefully in UI
      setLeaderboardError(true);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isStarted && value.length > 0) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    setUserInput(value);

    if (value === currentSnippet) {
      const finishTime = Date.now();
      setEndTime(finishTime);
      setIsFinished(true);
      setShowNameInput(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isFinished) {
      // Check if the user has completed typing correctly
      if (userInput === currentSnippet) {
        const finishTime = Date.now();
        setEndTime(finishTime);
        setIsFinished(true);
        setShowNameInput(true);
        toast.success('Challenge completed! 🎉');
      } else {
        toast.error('Please complete typing the snippet correctly first!');
      }
    }
  };

  const calculateAccuracy = () => {
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentSnippet[i]) {
        correct++;
      }
    }
    return Math.round((correct / currentSnippet.length) * 100);
  };

  const getCompletionTime = () => {
    if (startTime && endTime) {
      return ((endTime - startTime) / 1000).toFixed(2);
    }
    return '0.00';
  };

  const handleSubmitScore = async () => {
    if (!userName.trim()) {
      toast.error('Please enter your name!');
      return;
    }

    const entry: LeaderboardEntry = {
      name: userName.trim(),
      time: parseFloat(getCompletionTime()),
      accuracy: calculateAccuracy(),
      snippet: currentSnippet,
      timestamp: Date.now(),
    };

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-15ed28e0/leaderboard`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(entry),
        }
      );

      if (response.ok) {
        toast.success('Score submitted! 🏆');
        fetchLeaderboard();
        setShowNameInput(false);
      } else {
        toast.error('Server is currently unavailable. Please try again later.');
      }
    } catch (error) {
      // Network or server error - show user-friendly message
      toast.error('Server is currently unavailable. Please try again later.');
    }
  };

  const handleReset = () => {
    setUserInput('');
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
    setShowNameInput(false);
    setUserName('');
    selectRandomSnippet();
    inputRef.current?.focus();
  };

  const renderCharacters = () => {
    return currentSnippet.split('').map((char, index) => {
      let colorClass = 'text-gray-400';
      
      if (index < userInput.length) {
        colorClass = userInput[index] === char ? 'text-green-500' : 'text-red-500';
      }

      return (
        <span key={index} className={`${colorClass} transition-colors duration-150`}>
          {char}
        </span>
      );
    });
  };

  return (
    <section id="typing-challenge" className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF7A00]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-[#FF7A00]/10 px-6 py-2 rounded-full mb-4">
            <Keyboard className="size-5 text-[#FF7A00]" />
            <span className="text-[#FF7A00] font-semibold">Test Your Speed</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Typing Speed Challenge ⚡
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Type the code snippet as fast and accurately as possible!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Challenge Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Code Display */}
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500" />
                  <div className="size-3 rounded-full bg-yellow-500" />
                  <div className="size-3 rounded-full bg-green-500" />
                </div>
                <motion.button
                  onClick={handleReset}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="size-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              <div className="font-mono text-xl mb-6 bg-gray-100 dark:bg-gray-900/50 p-4 rounded-xl">
                {renderCharacters()}
              </div>

              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={isFinished}
                placeholder="Start typing..."
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-[#FF7A00] outline-none font-mono disabled:opacity-50"
                autoFocus
              />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-br from-[#FF7A00]/10 to-[#FEB273]/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="size-5 text-[#FF7A00]" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Time</span>
                  </div>
                  <div className="text-2xl font-bold text-[#FF7A00]">
                    {isFinished ? `${getCompletionTime()}s` : '—'}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-green-400/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="size-5 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy</span>
                  </div>
                  <div className="text-2xl font-bold text-green-500">
                    {isFinished ? `${calculateAccuracy()}%` : '—'}
                  </div>
                </div>
              </div>

              {/* Name Input for Leaderboard */}
              <AnimatePresence>
                {showNameInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 space-y-3"
                  >
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name for leaderboard"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-[#FF7A00] outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmitScore()}
                    />
                    <motion.button
                      onClick={handleSubmitScore}
                      className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FEB273] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit to Leaderboard 🏆
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Instructions */}
            <div className="bg-blue-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                <Zap className="size-5" />
                How to Play
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-0.5">•</span>
                  <span>Type the code snippet exactly as shown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-0.5">•</span>
                  <span>Timer starts when you begin typing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-0.5">•</span>
                  <span>Green = correct, Red = incorrect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-0.5">•</span>
                  <span>Press Enter when done to stop the timer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-0.5">•</span>
                  <span>Submit your score to compete on the leaderboard!</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Leaderboard Section */}
          <motion.div
            className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="size-6 text-[#FF7A00]" />
              <h3 className="text-2xl font-bold">Leaderboard</h3>
            </div>

            {isLoadingLeaderboard ? (
              <div className="flex items-center justify-center py-12">
                <motion.div
                  className="size-8 border-4 border-[#FF7A00] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            ) : leaderboardError ? (
              <div className="text-center py-12">
                <XCircle className="size-12 mx-auto mb-3 text-red-500 opacity-50" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Unable to load leaderboard.<br/>
                  The server is temporarily unavailable.
                </p>
                <motion.button
                  onClick={fetchLeaderboard}
                  className="px-6 py-2 bg-[#FF7A00] text-white rounded-full font-medium hover:bg-[#FF7A00]/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </motion.button>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Trophy className="size-12 mx-auto mb-3 opacity-30" />
                <p>Be the first to set a record!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl ${
                      index === 0
                        ? 'bg-gradient-to-r from-yellow-500/20 to-[#FF7A00]/20 border-2 border-yellow-500/30'
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-400/20 to-gray-300/20 border-2 border-gray-400/30'
                        : index === 2
                        ? 'bg-gradient-to-r from-orange-600/20 to-orange-500/20 border-2 border-orange-600/30'
                        : 'bg-gray-100/50 dark:bg-gray-800/50'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${
                          index === 0 ? 'text-yellow-600' :
                          index === 1 ? 'text-gray-500' :
                          index === 2 ? 'text-orange-600' :
                          'text-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{entry.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            {entry.snippet.substring(0, 20)}...
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#FF7A00]">
                          {entry.time}s
                        </div>
                        <div className="text-xs text-green-500">
                          {entry.accuracy}% acc
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}