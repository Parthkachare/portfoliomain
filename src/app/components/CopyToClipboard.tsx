import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CopyToClipboardProps {
  text: string;
  label?: string;
}

export function CopyToClipboard({ text, label }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success(`${label || 'Text'} copied to clipboard!`);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback method for older browsers or restricted contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setCopied(true);
            toast.success(`${label || 'Text'} copied to clipboard!`);
            setTimeout(() => setCopied(false), 2000);
          } else {
            toast.info(`${label || 'Text'}: ${text}`, { duration: 5000 });
          }
        } catch (err) {
          toast.info(`${label || 'Text'}: ${text}`, { duration: 5000 });
        }
        
        document.body.removeChild(textArea);
      }
    } catch (err) {
      // Show the text in a toast if copying fails
      toast.info(`${label || 'Text'}: ${text}`, { duration: 5000 });
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="ml-2 text-white/60 hover:text-[#FF7A00] transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
    </motion.button>
  );
}