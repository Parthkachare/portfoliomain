import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fireworksConfetti } from './ConfettiEffect';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function EasterEggs({ onAchievement }: { onAchievement: (achievement: string) => void }) {
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
  const [secretFound, setSecretFound] = useState(false);

  useEffect(() => {
    let clickCount = 0;
    let clickTimer: NodeJS.Timeout;

    // Konami Code
    const handleKeyPress = (e: KeyboardEvent) => {
      setKonamiProgress((prev) => {
        const newProgress = [...prev, e.key].slice(-KONAMI_CODE.length);
        
        if (JSON.stringify(newProgress) === JSON.stringify(KONAMI_CODE) && !secretFound) {
          setSecretFound(true);
          fireworksConfetti();
          toast.success('🎮 KONAMI CODE ACTIVATED! You are a true gamer!', { duration: 5000 });
          onAchievement('konami');
          document.body.style.animation = 'rainbow 2s linear infinite';
          setTimeout(() => {
            document.body.style.animation = '';
          }, 5000);
        }
        
        return newProgress;
      });
    };

    // Triple Click Easter Egg
    const handleClick = () => {
      clickCount++;
      clearTimeout(clickTimer);
      
      if (clickCount === 10) {
        toast.success('🎉 Speed Clicker! You found a secret!', { duration: 3000 });
        onAchievement('speedclicker');
        clickCount = 0;
      }
      
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 2000);
    };

    // Secret Key Combinations
    const handleSecretKeys = (e: KeyboardEvent) => {
      // Press P+K together
      if (e.key && e.key.toLowerCase() === 'p' && e.shiftKey) {
        toast.success('💎 You found the PK secret!', { duration: 3000 });
        onAchievement('pk-combo');
      }

      // Press Escape 3 times quickly
      if (e.key === 'Escape') {
        // Simple implementation
        toast.info('🔍 Keep exploring...', { duration: 2000 });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', handleSecretKeys);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keydown', handleSecretKeys);
      window.removeEventListener('click', handleClick);
    };
  }, [secretFound, onAchievement]);

  return null;
}

// Add rainbow animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);