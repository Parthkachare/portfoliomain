import { motion } from 'motion/react';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function DownloadResumeButton() {
  const handleDownload = () => {
    toast.success('Resume downloaded! 📄');
    // In a real scenario, this would trigger an actual PDF download
    // const link = document.createElement('a');
    // link.href = '/path-to-resume.pdf';
    // link.download = 'Parth_Kachare_Resume.pdf';
    // link.click();
  };

  return (
    <motion.button
      onClick={handleDownload}
      className="group relative overflow-hidden bg-gradient-to-r from-[#FF7A00] to-[#FEB273] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
        initial={false}
      />
      <div className="flex items-center gap-3 relative z-10">
        <FileText className="size-6" />
        <span>Download Resume</span>
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Download className="size-5" />
        </motion.div>
      </div>
    </motion.button>
  );
}
