import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Send, Info } from 'lucide-react';
import { toast } from 'sonner';

interface PasswordDecoderProps {
  onComplete: () => void;
}

const cipherTexts = [
  {
    encrypted: "Khoor Zruog",
    decoded: "hello world",
    shift: 3,
    hint: "Caesar cipher (shift +3)"
  },
  {
    encrypted: "Frgh Sdvvzrug",
    decoded: "code password",
    shift: 3,
    hint: "Caesar cipher (shift +3)"
  },
  {
    encrypted: "Jvvbt Alkq",
    decoded: "debug tool",
    shift: 5,
    hint: "Caesar cipher (shift +5)"
  },
  {
    encrypted: "Dqdobvh Gdwd",
    decoded: "analyze data",
    shift: 3,
    hint: "Caesar cipher (shift +3)"
  },
  {
    encrypted: "Fubswrjudsk",
    decoded: "cryptograph",
    shift: 3,
    hint: "Caesar cipher (shift +3)"
  },
  {
    encrypted: "Nkdgwv Uwgwu",
    decoded: "latest stats",
    shift: 6,
    hint: "Caesar cipher (shift +6)"
  },
];

export function PasswordDecoder({ onComplete }: PasswordDecoderProps) {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCipher, setCurrentCipher] = useState(cipherTexts[0]);

  useEffect(() => {
    const randomCipher = cipherTexts[Math.floor(Math.random() * cipherTexts.length)];
    setCurrentCipher(randomCipher);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userAnswer = answer.trim().toLowerCase();
    
    if (userAnswer === currentCipher.decoded) {
      toast.success('Password decoded! 🔓');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      toast.error('Incorrect. Remember the shift cipher hint!');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950 to-black" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl md:text-5xl font-bold">Puzzle 4</h2>
          </div>
          <p className="text-xl text-gray-400 font-mono">Password Decoder</p>
        </motion.div>

        {/* Decoder Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl w-full backdrop-blur-md bg-white/5 border border-green-500/20 rounded-3xl overflow-hidden"
        >
          {/* Cyber panel header */}
          <div className="bg-green-500/10 border-b border-green-500/20 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-mono text-sm text-green-400">DECRYPTION_MODULE.exe</span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Encrypted text display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <label className="block text-sm font-medium text-gray-400 mb-3 font-mono">
                ENCRYPTED MESSAGE
              </label>
              <div className="bg-black/50 border border-green-500/30 rounded-xl p-6">
                <div className="font-mono text-2xl md:text-4xl text-green-400 text-center tracking-wider">
                  {currentCipher.encrypted.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">
                    <span className="text-green-400 font-semibold font-mono">Cipher Type:</span> {currentCipher.hint}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Shift each letter back by {currentCipher.shift} positions in the alphabet</p>
                </div>
              </div>
            </motion.div>

            {/* Decode form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="decoded" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                  DECODED MESSAGE
                </label>
                <input
                  type="text"
                  id="decoded"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter decoded text..."
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-black/50 border border-green-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !answer.trim()}
                className="group w-full px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>Decrypt & Submit</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>

            {/* Example */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 p-4 bg-black/30 border border-white/10 rounded-lg"
            >
              <p className="text-xs text-gray-500 font-mono">
                Example: D E F → A B C (shift back 3)
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}