import { motion, AnimatePresence } from 'motion/react';
import { Plus, Mail, Download, Share2, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = async () => {
    // Check if Web Share API is available and supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Parth Kachare - Portfolio',
          text: 'Check out this awesome portfolio!',
          url: window.location.href
        });
        toast.success('Thanks for sharing!');
      } catch (error: any) {
        // User cancelled the share or it failed
        if (error.name !== 'AbortError') {
          // If not cancelled, copy to clipboard instead
          copyToClipboard();
        }
      }
    } else {
      // Fallback to copying link
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          toast.success('Link copied to clipboard!');
        })
        .catch(() => {
          toast.info('Share link: ' + window.location.href, { duration: 5000 });
        });
    } else {
      toast.info('Share link: ' + window.location.href, { duration: 5000 });
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Parth_Kachare_Resume.pdf';
    link.download = 'Parth_Kachare_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Resume downloaded successfully! 📄');
    setIsOpen(false);
  };

  const actions = [
    { icon: Mail, label: 'Email Me', action: () => scrollToContact() },
    { icon: Download, label: 'Download CV', action: handleDownloadCV },
    { icon: Share2, label: 'Share', action: handleShare },
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={action.action}
                  className="group flex items-center gap-3 bg-white dark:bg-[#1a1a1a] hover:bg-[#FF7A00] dark:hover:bg-[#FF7A00] text-gray-900 dark:text-white hover:text-white rounded-full pl-4 pr-6 py-3 shadow-lg transition-colors"
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="size-10 rounded-full bg-[#FF7A00]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="font-medium whitespace-nowrap">{action.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="size-16 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FEB273] text-white shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? <X size={28} /> : <Plus size={28} />}
      </motion.button>
    </div>
  );
}