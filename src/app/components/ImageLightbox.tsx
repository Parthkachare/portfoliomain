import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
}

export function ImageLightbox({ images, currentIndex, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(currentIndex);
  const [zoom, setZoom] = useState(1);

  const handlePrevious = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {/* Close Button */}
      <motion.button
        className="absolute top-8 right-8 size-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 flex items-center justify-center transition-colors"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={24} />
      </motion.button>

      {/* Zoom Controls */}
      <div className="absolute top-8 left-8 flex gap-2">
        <motion.button
          className="size-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setZoom((prev) => Math.min(prev + 0.25, 3));
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ZoomIn size={20} />
        </motion.button>
        <motion.button
          className="size-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setZoom((prev) => Math.max(prev - 0.25, 0.5));
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ZoomOut size={20} />
        </motion.button>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <motion.button
            className="absolute left-8 size-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            className="absolute right-8 size-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </>
      )}

      {/* Image */}
      <motion.img
        key={index}
        src={images[index]}
        alt="Full size"
        className="max-w-[90vw] max-h-[90vh] object-contain"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: zoom }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{ cursor: zoom > 1 ? 'move' : 'default' }}
      />

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full">
          {index + 1} / {images.length}
        </div>
      )}
    </motion.div>
  );
}
