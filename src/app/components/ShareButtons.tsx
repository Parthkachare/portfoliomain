import { motion } from 'motion/react';
import { Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

export function ShareButtons({ url = window.location.href, title = 'Check out this awesome portfolio!' }: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        // Try modern clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url)
            .then(() => {
              toast.success('Link copied to clipboard!');
            })
            .catch(() => {
              toast.info(`Link: ${url}`, { duration: 5000 });
            });
        } else {
          // Fallback method
          const textArea = document.createElement('textarea');
          textArea.value = url;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            const successful = document.execCommand('copy');
            if (successful) {
              toast.success('Link copied to clipboard!');
            } else {
              toast.info(`Link: ${url}`, { duration: 5000 });
            }
          } catch (err) {
            toast.info(`Link: ${url}`, { duration: 5000 });
          }
          
          document.body.removeChild(textArea);
        }
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex gap-3">
      <motion.button
        onClick={() => handleShare('twitter')}
        className="size-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Twitter size={18} />
      </motion.button>
      <motion.button
        onClick={() => handleShare('linkedin')}
        className="size-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Linkedin size={18} />
      </motion.button>
      <motion.button
        onClick={() => handleShare('facebook')}
        className="size-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Facebook size={18} />
      </motion.button>
      <motion.button
        onClick={() => handleShare('copy')}
        className="size-10 rounded-full bg-gray-500/10 text-gray-600 dark:text-gray-400 hover:bg-gray-500/20 flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link2 size={18} />
      </motion.button>
    </div>
  );
}