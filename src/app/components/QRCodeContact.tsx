import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, X } from 'lucide-react';
import { useState } from 'react';

export function QRCodeContact() {
  const [showQR, setShowQR] = useState(false);

  const contactData = `BEGIN:VCARD
VERSION:3.0
FN:Parth Kachare
TITLE:UI/UX Designer & Developer
EMAIL:parthuidesigns@gmail.com
URL:https://parthkachare.com
END:VCARD`;

  return (
    <>
      <motion.button
        onClick={() => setShowQR(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FEB273] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <QrCode className="size-5" />
        <span>Save Contact</span>
      </motion.button>

      <AnimatePresence>
        {showQR && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 max-w-sm w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold dark:text-white">Save My Contact</h3>
                <button
                  onClick={() => setShowQR(false)}
                  className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl mb-4 flex items-center justify-center">
                <QRCodeSVG
                  value={contactData}
                  size={200}
                  level="H"
                  includeMargin
                  fgColor="#FF7A00"
                />
              </div>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Scan this QR code to save my contact information
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
