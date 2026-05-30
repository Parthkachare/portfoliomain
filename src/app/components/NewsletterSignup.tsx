import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterSignup() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed to newsletter! 🎉');
      setIsSubmitted(true);
      setTimeout(() => {
        setShowPopup(false);
        setIsSubmitted(false);
        setEmail('');
      }, 2000);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setShowPopup(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="size-5 text-[#FF7A00]" />
        <span className="font-semibold dark:text-white">Subscribe to Newsletter</span>
      </motion.button>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white mb-2">
                    Stay Updated! 📬
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get the latest design tips and project updates
                  </p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#FF7A00]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="w-full pl-14 pr-4 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-[#FF7A00] outline-none transition-all"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FEB273] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="size-5" />
                    <span>Subscribe Now</span>
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle2 className="size-20 text-green-500 mb-4" />
                  </motion.div>
                  <h4 className="text-2xl font-bold dark:text-white mb-2">
                    You're In! 🎉
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Thanks for subscribing! Check your inbox soon.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
